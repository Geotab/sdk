using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    /// <summary>
    /// Provides application specific parsing functionality
    /// </summary>
    class ImportGroupParser
    {
        const string CompanyGroupSReference = "Company Group";  // doesn't have to be actual sReference from DB of the group with KnownId.GroupCompanyId
        readonly SortedSet<int> allowedColors;
        readonly API checkmateApi;
        readonly string rootGroupSreference;
        readonly StringComparison stringComparison = StringComparison.OrdinalIgnoreCase;

        Group firstLineParentGroupFromDb;

        // null means CompanyGroup should be used as ImportGroups Root Group
        string firstLineParentSreference;

        IList<Group> groupListFromDb;

        // MD_temporary for development
        Dictionary<Id, Group> groupLookupByIdFromDb;

        // Key - Id

        IDictionary<string, IList<Group>> groupsInDbWithNonUniqueReferenceLookup; // Key -sReference
        Group rootGroupFromDb;

        // the difference between two next references is their children, parsed Children versus retrieved Children
        Group rootGroupParsed;      // clone of rootGroupFromDB

        int row;

        /// <summary>
        /// Initializes a new instance of the <see cref="ImportGroupParser" /> class.
        /// </summary>
        /// <param name="api">The API.</param>
        /// <param name="rootGroupSreference">The root group sreference.</param>
        public ImportGroupParser(API api, string rootGroupSreference)
        {
            checkmateApi = api;
            allowedColors = new SortedSet<int>(new List<Colors> { Colors.Red, Colors.Orange, Colors.Green, Colors.Yellow, Colors.Cyan, Colors.Blue, Colors.Purple }.Cast<int>(), Comparer<int>.Default);
            this.rootGroupSreference = rootGroupSreference;
        }

        public delegate void LoggerAction(string format, params object[] arg);

        delegate TKey GetKey<TKey, TValue>(TValue entity);

        /// <summary>
        /// Occurs when [fully populated group reference not found].
        /// </summary>
        public event EventHandler<EventArgs> FullyPopulatedGroupReferenceNotFound;

        public event EventHandler<RowParsedEventArgs<Group>> RowParsed;

        /// <summary>
        /// Colors
        /// </summary>
        enum Colors
        {
            /// <summary>
            /// The blue color
            /// </summary>
            Blue = 255,
            /// <summary>
            /// The green color
            /// </summary>
            Green = 128 << 8,
            /// <summary>
            /// The purple color
            /// </summary>
            Purple = 128 << 16 | 128,
            /// <summary>
            /// The cyan color
            /// </summary>
            Cyan = 173 << 16 | 216 << 8 | 230,
            /// <summary>
            /// The red color
            /// </summary>
            Red = 255 << 16 | 69 << 8,
            /// <summary>
            /// The orange color
            /// </summary>
            Orange = 255 << 16 | 165 << 8,
            /// <summary>
            /// The yellow color
            /// </summary>
            Yellow = 255 << 16 | 255 << 8
        }

        /// <summary>
        /// Gets the first line parent group from database. Must be equal or child of the rootGroupParsed, must be present in the database
        /// </summary>
        /// <value>
        /// The first line parent group from database.
        /// </value>
        public Group FirstLineParentGroupFromDB => firstLineParentGroupFromDb;

        /// <summary>
        /// Gets the first line parent group parsed, a clone of firstLineParentGroupFromDB, .Children property's .Count is 0
        /// </summary>
        /// <value>
        /// The first line parent group parsed.
        /// </value>
        public Group FirstLineParentGroupParsed { get; set; }

        /// <summary>
        /// Gets the group lookup with <see cref="Group.Reference"/> Reference as Key and <see cref="Group"/> as value as retrieved from the DB.
        /// </summary>
        /// <value>
        /// The group lookup from database.
        /// </value>
        public Dictionary<string, Group> GroupLookupFromDB { get; set; }

        /// <summary>
        /// Gets the group lookup with <see cref="Group.Reference"/> Reference as Key and <see cref="Group"/> as value as parsed from file.
        /// </summary>
        /// <value>
        /// The group lookup from input file.
        /// </value>
        public Dictionary<string, Group> GroupLookupParsed { get; set; }

        public List<Group> GroupsParsedList { get; private set; }

        // must be Company Group or decendent, a group with its sReference must be present in the database
        public static void RowParsedHandler(object sender, RowParsedEventArgs<Group> e, LoggerAction log, bool isVerboseMode, bool flush)
        {
            if (isVerboseMode || e.Exception != null)
            {
                log($"Parsed Row: {e.Row}" + (e.Exception == null ? $" OK, {e.ImportedItem.Parent.Name},{e.ImportedItem.Parent.Reference},{e.ImportedItem.Name},{e.ImportedItem.Reference}" : ", exception: " + e.Exception.Message));
                if (flush)
                {
                    Console.Out.Flush();
                }
            }

            // Terminate is decided by ImportGroupParser and is transparent to RowParser
            if (e.Exception?.Message.Contains("Terminate") == true)
            {
                throw e.Exception;
            }
        }

        /// <inheritdoc/>
        public List<Group> Parse(Stream stream)
        {
            // All groups under the Company Group with name *Org* are returned, with the Company Group itself being the first in list
            groupListFromDb = checkmateApi.Call<IList<Group>>("Get", typeof(Group)) ?? new List<Group>();

            GroupLookupFromDB = CreateDictionary(groupListFromDb, g => g.Reference, out groupsInDbWithNonUniqueReferenceLookup);
            groupLookupByIdFromDb = CreateDictionary(groupListFromDb, g => g.Id, out IDictionary<Id, IList<Group>> groupsWithNonUniqueIdLookup);

            GroupLookupParsed = new Dictionary<string, Group>(); // is populated in the next line call, not obvious!!!
            List<Group> items = new List<Group>();
            row = 0;
            using (StreamReader streamReader = new StreamReader(stream))
            {
                string line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    if (line.StartsWith("'", StringComparison.Ordinal) || line.StartsWith("--", StringComparison.Ordinal) || line.StartsWith(";", StringComparison.Ordinal) || line.StartsWith("//", StringComparison.Ordinal) || line.StartsWith("#", StringComparison.Ordinal) || string.IsNullOrEmpty(line))
                    {
                        // Comment line, continue
                        continue;
                    }
                    row++;
                    try
                    {
                        Group item = ParseLine(line, items);
                        OnRowParsed(new RowParsedEventArgs<Group>(item, row, line));
                    }
                    catch (Exception exception)
                    {
                        OnRowParsed(new RowParsedEventArgs<Group>(row, line, exception));
                    }
                }
            }
            GroupsParsedList = items;
            var linkedFirstLineParentGroupFromDb = CreateLinkedTreeForDbGroups(firstLineParentGroupFromDb, groupLookupByIdFromDb);
            Debug.Assert(linkedFirstLineParentGroupFromDb == firstLineParentGroupFromDb, "CreateLinkedTreForDBGroups altered tree root Group object reference");
            firstLineParentGroupFromDb = linkedFirstLineParentGroupFromDb;
            return GroupsParsedList;
        }

        /// <summary>
        /// Raises the <see cref="E:FullyPopulatedGroupReferenceNotFound" /> event.
        /// </summary>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected void OnFullyPopulatedGroupReferenceNotFound(EventArgs e)
        {
            FullyPopulatedGroupReferenceNotFound?.Invoke(this, e);
        }

        protected void OnRowParsed(RowParsedEventArgs<Group> e)
        {
            EventHandler<RowParsedEventArgs<Group>> eventHandler = RowParsed;
            eventHandler?.Invoke(this, e);
        }

        /// <summary>
        /// Parses a comma separted string into a <see cref="Group"/> object and adds it to<paramref name="items"/>
        /// </summary>
        /// <param name="line">file line</param>
        /// <param name="items">list to accumulate</param>
        /// <returns><see cref="Group"/></returns>
        protected Group ParseLine(string line, IList<Group> items)
        {
            var columns = line.Split(',');
            var parentName = columns[0];
            var parentSreference = columns[1];
            if (string.IsNullOrEmpty(parentSreference))
            {
                parentSreference = parentName;
            }
            var childName = columns[2];
            var childSreference = columns[3];
            if (string.IsNullOrEmpty(childSreference))
            {
                childSreference = childName;
            }
            int childColor = 0;
            if (!string.IsNullOrEmpty(columns[4]))
            {
                // may throw exception
                childColor = int.Parse(columns[4]);

                childColor = NormalizeGroupColor(childColor);
            }
            var childDescription = columns[5];
            Group parentGroup;
            if (row == 1)
            {
                firstLineParentSreference = parentSreference;

                if (string.IsNullOrEmpty(rootGroupSreference) || rootGroupSreference.Equals(CompanyGroupSReference, stringComparison))
                {
                    rootGroupParsed = new CompanyGroup(0, 0, null, CompanyGroupSReference); // Company Group will not be added to the database by client code
                }
                else if (GroupLookupFromDB.TryGetValue(rootGroupSreference, out rootGroupFromDb))
                {
                    rootGroupParsed = (Group)rootGroupFromDb.Clone();
                }
                else
                {
                    throw new InvalidDataException($"Terminate, root group with sReference '{rootGroupSreference}' does not exist in the Node table in the database");
                }
                if (parentSreference.Equals(CompanyGroupSReference, stringComparison)
                    && !(rootGroupParsed is CompanyGroup))
                {
                    throw new InvalidDataException($"Terminate, first line parent with '{parentSreference}' is CompanyGroup while root group with sReference '{rootGroupSreference}' from command line is not");
                }

                if (!GroupLookupFromDB.TryGetValue(firstLineParentSreference, out firstLineParentGroupFromDb))
                {
                    throw new InvalidDataException($"Terminate, first line parent group with sReference '{parentSreference}' does not exist in the Node table in the database");
                }
                FirstLineParentGroupParsed = (Group)firstLineParentGroupFromDb.Clone();

                if (groupsInDbWithNonUniqueReferenceLookup != null && groupsInDbWithNonUniqueReferenceLookup.TryGetValue(firstLineParentSreference, out IList<Group> nonUniqueGroups)
                    && nonUniqueGroups != null && nonUniqueGroups.Count > 0)
                {
                    throw new InvalidDataException($"Terminate, first line parent group is not unique in the database. {nonUniqueGroups.Count} groups with sReference '{firstLineParentSreference}' are in the Node table");
                }
            }

            if (GroupLookupParsed.TryGetValue(childSreference, out Group childGroup))
            {
                throw new InvalidDataException($"Group with non-unique sReference of '{childSreference}' is in the input file");
            }
            if (parentSreference.Equals(firstLineParentSreference, stringComparison))
            {
                parentGroup = FirstLineParentGroupParsed;
            }
            else if (!GroupLookupParsed.TryGetValue(parentSreference, out parentGroup))
            {
                throw new InvalidDataException($"Parent group with sReference '{parentSreference}' is not parsed yet");
            }

            // Link parsed group into the group tree
            childGroup = new Group(null, parentGroup, childName, childDescription, childSreference, new Drawing.Color(childColor, false));
            GroupLookupParsed.Add(childSreference, childGroup);
            parentGroup.Children.Add(childGroup);

            items.Add(childGroup);
            return childGroup;
        }

        /// <summary>
        /// Creates the dictionary. If an element with the existing key encountered again it is added to <paramref name="nonUniqueElementsLookup" />. Thus one instance of Value with non-unique Key will always be in the returned Dictionary and the rest of them will be in <paramref name="nonUniqueElementsLookup" />.
        /// </summary>
        /// <typeparam name="TKey">The type of the key.</typeparam>
        /// <typeparam name="TValue">The type of the value.</typeparam>
        /// <param name="collection">The collection.</param>
        /// <param name="getKey">The unique string.</param>
        /// <param name="nonUniqueElementsLookup">The non unique elements lookup.</param>
        /// <param name="comp"><see cref="IEqualityComparer{T}"/> implementation implementation</param>
        /// <returns></returns>
        static Dictionary<TKey, TValue> CreateDictionary<TKey, TValue>(ICollection<TValue> collection, GetKey<TKey, TValue> getKey, out IDictionary<TKey, IList<TValue>> nonUniqueElementsLookup, IEqualityComparer<TKey> comp = null)
        {
            Dictionary<TKey, TValue> lookup = comp == null ? new Dictionary<TKey, TValue>(collection.Count) : new Dictionary<TKey, TValue>(collection.Count, comp);
            nonUniqueElementsLookup = new Dictionary<TKey, IList<TValue>>();
            foreach (var item in collection)
            {
                var key = getKey(item);
                if (IsKeyValid(key))
                {
                    if (!lookup.ContainsKey(key))
                    {
                        lookup.Add(key, item);
                    }
                    else
                    {
                        if (!nonUniqueElementsLookup.TryGetValue(key, out IList<TValue> nonUniqueElementsList))
                        {
                            nonUniqueElementsList = new List<TValue>();
                            nonUniqueElementsLookup.Add(key, nonUniqueElementsList);
                        }
                        nonUniqueElementsList.Add(item);
                    }
                }
            }
            return lookup;
        }

        /// <summary>
        /// Creates the linked tree of Groups, sets <see cref="Group.Parent" /> and each of <see cref="Group.Children" /> to fully populated Group references.
        /// </summary>
        /// <param name="root">The root <see cref="Group"/>.</param>
        /// <param name="groupLookup">The <see cref="Group"/>  lookup by <see cref="Group.Reference"/>.</param>
        /// <returns>
        /// root
        /// </returns>
        static Group CreateLinkedTreeForDbGroups(Group root, IDictionary<Id, Group> groupLookup)
        {
            foreach (var group in new GroupBreadthFirstIterator(root))
            {
                for (int i = 0; i < group.Children.Count; i++)
                {
                    if (groupLookup.TryGetValue(group.Children[i].Id, out Group populatedChildGroup))
                    {
                        populatedChildGroup.Parent = group;
                        group.Children[i] = populatedChildGroup;
                    }
                    else
                    {
                        // TODO: process the case of API corruption: unlikely to happen
                    }
                }
            }
            return root;
        }

        static bool IsKeyValid<TKey>(TKey key)
        {
            if (typeof(TKey) == typeof(string))
            {
                return !string.IsNullOrEmpty(key as string);
            }
            if (typeof(TKey) == typeof(Id))
            {
                return key != null;
            }
            throw new NotSupportedException($"IsKeyValid: invalid key type {typeof(Key)}");
        }

        int NormalizeGroupColor(int childColor)
        {
            if (allowedColors.Contains(childColor))
            {
                return childColor;
            }
            foreach (var color in allowedColors)
            {
                if (allowedColors.Comparer.Compare(childColor, color) > 0)
                {
                    return color;
                }
            }
            return 0;
        }
    }
}