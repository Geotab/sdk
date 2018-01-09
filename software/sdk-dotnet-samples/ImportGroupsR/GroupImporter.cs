using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Geotab.Checkmate;
using Geotab.Checkmate.ObjectModel;
using Geotab.Checkmate.ObjectModel.Exceptions;

namespace Geotab.SDK.ImportGroupsR
{
    /// <summary>
    /// Group Importer
    /// </summary>
    class GroupImporter
    {
        const string AllIn = "All In";
        const string Dashboard = "Dashboard";
        const string DashboardInclude = "Dashboard Viewers:";
        const string DashBoardScopeGroups = "Belonging to:";
        const string DefaultIncludeGroups = "IncludeGroups";
        const string DefaultReportTypeSuffix = "Unknown";
        const string DefaultScopeGroups = "ScopeGroups";
        const string EmailReport = "Email Report";
        const string EmailReportInclude = "Recipient List:";
        const string EmailReportScopeGroups = "Belonging to:";
        const string OnlyIn = "Only In";
        const string ReportView = "Report view";
        const string ReportViewScopeGroups = "Who can see this report:";
        readonly API api;
        readonly bool deleteEmptyGroups;
        readonly Group firstLineParentGroupFromDB;
        readonly Group firstLineParentGroupParsed;
        readonly IDictionary<string, Group> groupLookupFromDB;
        readonly IDictionary<string, Group> groupLookupParsed;
        readonly Dictionary<string, EntityImportStatus> importStatusLookup;
        readonly bool moveAssetsUp;
        readonly IEqualityComparer<string> stringEqualityComparer = StringComparer.CurrentCultureIgnoreCase;

        /// <summary>
        /// Initializes a new instance of the <see cref="GroupImporter" /> class.
        /// </summary>
        /// <param name="api">The API.</param>
        /// <param name="firstLineParentGroupParsed">Parsed group tree root starting with first line parent.</param>
        /// <param name="firstLineParentGroupFromDB">Group tree retrived from DB. Root sReference matches that of first line parent parsed</param>
        /// <param name="parsedGroupCount">The parsed group count.</param>
        /// <param name="groupLookupParsed">The group lookup parsed.</param>
        /// <param name="groupLookupFromDB">The group lookup from database.</param>
        /// <param name="deleteEmptyGroups">If false, only log DeletionCandidate</param>
        /// <param name="moveAssetsUp">If false, don't delete non-empty groups</param>
        public GroupImporter(API api, Group firstLineParentGroupParsed, Group firstLineParentGroupFromDB, int parsedGroupCount, IDictionary<string, Group> groupLookupParsed, IDictionary<string, Group> groupLookupFromDB, bool deleteEmptyGroups, bool moveAssetsUp)
        {
            this.api = api;
            importStatusLookup = new Dictionary<string, EntityImportStatus>(parsedGroupCount, stringEqualityComparer);
            this.firstLineParentGroupParsed = firstLineParentGroupParsed;
            this.firstLineParentGroupFromDB = firstLineParentGroupFromDB;
            this.groupLookupFromDB = groupLookupFromDB;
            this.groupLookupParsed = groupLookupParsed;
            this.deleteEmptyGroups = deleteEmptyGroups;
            this.moveAssetsUp = moveAssetsUp;
        }

        public delegate void LoggerAction(string format, params object[] arg);

        /// <summary>
        /// Occurs when <see cref="Group"/>imported.
        /// </summary>
        public event EventHandler<EntityImportedEventArgs<GroupWithLoggingData>> EntityImported;

        /// <summary>
        /// Occurs when <see cref="GroupRelations"/> population from DB fails, used for Entity that is not NameEntity
        /// </summary>
        public event EventHandler<EntityImportedEventArgs<Entity>> GroupRelatedEntityPopulationFailed;

        /// <summary>
        /// Occurs when <see cref="GroupRelations"/> population from DB fails
        /// </summary>
        public event EventHandler<EntityImportedEventArgs<NameEntity>> GroupRelatedNameEntityPopulationFailed;

        public static void GroupImportedHandler(object sender, EntityImportedEventArgs<GroupWithLoggingData> e, LoggerAction log, bool isVerboseMode, bool flush)
        {
            bool isOutputRequired = true;
            switch (e.Status)
            {
                case EntityImportStatus.Added:
                case EntityImportStatus.Updated:
                case EntityImportStatus.MovedExisting:
                case EntityImportStatus.MovedUpdated:
                case EntityImportStatus.Existing:
                    isOutputRequired = isVerboseMode;
                    break;
            }
            if (isOutputRequired)
            {
                log($"Imported with status {e.Status} <{e.Entity.Group.Name}> <{e.Entity.Group.Reference}> {(e.Status == EntityImportStatus.MovedExisting || e.Status == EntityImportStatus.MovedUpdated ? $"from <{e.Entity.NameOfParentInDB}> <{e.Entity.SreferenceOfParentInDB}> to" : "child of")} <{e.Entity.Group.Parent.Name}> <{e.Entity.Group.Parent.Reference}>.{(e.Exception == null ? "" : $" {(EntityImportStatus.Failed == e.Status ? "exception: " : "")}{e.Exception.Message}")}");
                if (e.Status == EntityImportStatus.CannotDeleteNotEmpty)
                {
                    LogOffendingAssets(e.Entity.Group, e.Entity.Relations, log);
                }
                if (flush)
                {
                    Console.Out.Flush();
                }
            }
        }

        public static void GroupRelationsPopulationFailureHandler(object sender, EntityImportedEventArgs<NameEntity> e, LoggerAction log, bool flush)
        {
            log($"Failed to populate {e.Entity.GetType()} with Id {e.Entity.Id}. Exception: {e.Exception.Message}");
            if (flush)
            {
                Console.Out.Flush();
            }
        }

        /// <summary>
        /// Determines how each parsed group needs to be imported, what groups to delete from DB and imports the groups.
        /// </summary>
        public void DetermineDispositionAndImportGroups()
        {
            DetermineGroupImportStatusForParsedGroups();
            var groupTreesToDelete = DetermineGroupDeleteStatusForGroupsFromDB();
            ImportParsedGroups();
            DeleteGroupsFromDB(groupTreesToDelete);
        }

        /// <summary>
        /// Raises the <see cref="E:EntityImported" /> event.
        /// </summary>
        /// <param name="e">The <see cref="EntityImportedEventArgs{Group}"/> instance containing the event data.</param>
        protected void OnEntityImported(EntityImportedEventArgs<GroupWithLoggingData> e)
        {
            EntityImported?.Invoke(this, e);
        }

        /// <summary>
        /// Raises the <see cref="E:GroupRelatedEntityPopulationFailed" /> event.
        /// </summary>
        /// <param name="e">The <see cref="EntityImportedEventArgs{NameEntity}"/> instance containing the event data.</param>
        protected void OnGroupRelatedEntityPopulationFailed(EntityImportedEventArgs<Entity> e)
        {
            GroupRelatedEntityPopulationFailed?.Invoke(this, e);
        }

        /// <summary>
        /// Raises the <see cref="E:GroupRelatedNameEntityPopulationFailed" /> event.
        /// </summary>
        /// <param name="e">The <see cref="EntityImportedEventArgs{NameEntity}"/> instance containing the event data.</param>
        protected void OnGroupRelatedNameEntityPopulationFailed(EntityImportedEventArgs<NameEntity> e)
        {
            GroupRelatedNameEntityPopulationFailed?.Invoke(this, e);
        }

        static Driver GetDriver(User user)
        {
            if (!(user is Driver driver))
            {
                if (user is NoUser)
                {
                    return NoDriver.Value;
                }
                return new Driver { Name = user.Name };
            }
            return driver;
        }

        static void InsertCustomReportScheduleForLogging(LinkedList<CustomReportSchedule> list, CustomReportSchedule valueToInsert, CustomReportScheduleComparerForLogging comparer)
        {
            if (list.Count == 0)
            {
                list.AddFirst(valueToInsert);
                return;
            }
            var currentInList = list.First;
            while (comparer.Compare(currentInList.Value, valueToInsert) < 0 && currentInList != list.Last)
            {
                currentInList = currentInList.Next;
            }
            if (comparer.Compare(currentInList.Value, valueToInsert) > 0)
            {
                list.AddBefore(currentInList, valueToInsert); //last was reached
            }
            else
            {
                list.AddAfter(currentInList, valueToInsert);
            }
        }

        static bool IsGroupInList(IList<Group> groups, Group groupToFind)
        {
            foreach (var group in groups)
            {
                if (group.Id.Equals(groupToFind.Id))
                {
                    return true;
                }
            }
            return false;
        }

        static void LogCustomReportSchedule(Group group, StringBuilder stringBuilder, CustomReportSchedule report)
        {
            var reportTypeSuffix = DefaultReportTypeSuffix;
            var scopeGroups = DefaultScopeGroups;
            var includeGroups = DefaultIncludeGroups;
            bool scope = false;
            bool includeAllChildren = false;
            bool includeDirectChildrenOnly = false;
            switch (report.Destination)
            {
                case ReportDestination.NormalReport:
                    reportTypeSuffix = ReportView;
                    scopeGroups = ReportViewScopeGroups;
                    break;

                case ReportDestination.Dashboard:
                    reportTypeSuffix = Dashboard;
                    scopeGroups = DashBoardScopeGroups;
                    includeGroups = $"{DashboardInclude}";
                    break;

                case ReportDestination.EmailExcel:
                case ReportDestination.EmailPdf:
                    reportTypeSuffix = EmailReport;
                    scopeGroups = EmailReportScopeGroups;
                    includeGroups = $"{EmailReportInclude}";
                    break;
            }
            if (IsGroupInList(report.ScopeGroups, group))
            {
                scope = true;
            }
            if (IsGroupInList(report.IncludeAllChildrenGroups, group))
            {
                includeAllChildren = true;
            }
            if (IsGroupInList(report.IncludeDirectChildrenOnlyGroups, group))
            {
                includeDirectChildrenOnly = true;
            }
            var includePart = $"{(includeAllChildren || includeDirectChildrenOnly ? $"{(scope ? ", " : "")}<{includeGroups}> as <{(includeAllChildren ? AllIn : OnlyIn)}>" : "")}";
            stringBuilder.Append(reportTypeSuffix).Append(" <").Append(report.Template.Name).Append("> with the group above in ").Append(scope ? $"<{scopeGroups}>" : "").Append(includePart);
        }

        static void LogOffendingAssets(Group group, GroupRelations relations, LoggerAction log)
        {
            var stringBuilder = new StringBuilder();
            bool entitiesLogged = LogOffendingNameEntityClass(stringBuilder, relations.Zones, false);
            entitiesLogged = LogOffendingNameEntityClass(stringBuilder, relations.Devices, entitiesLogged);
            entitiesLogged = LogOffendingNameEntityClass(stringBuilder, relations.Users, entitiesLogged);
            entitiesLogged = LogOffendingNameEntityClass(stringBuilder, relations.Drivers.ConvertAll(GetDriver), entitiesLogged);
            entitiesLogged = LogOffendingNameEntityClass(stringBuilder, relations.Rules, entitiesLogged);
            LogOffendingCustomReportSchedules(group, stringBuilder, relations.CustomReportSchedules, entitiesLogged);
            if (stringBuilder.Length > 0)
            {
                log(stringBuilder.ToString());
            }
        }

        static bool LogOffendingCustomReportSchedules(Group group, StringBuilder stringBuilder, List<CustomReportSchedule> reports, bool addEndOfLine)
        {
            if (reports == null || reports.Count < 1)
            {
                return false;
            }

            // could have done Binary Search Tree, but need to implement since .NET doesn't have a standard implementation
            var reportsByTemplateNameTemplateIdScheduleDestination = new LinkedList<CustomReportSchedule>();
            var comparer = new CustomReportScheduleComparerForLogging();
            foreach (var report in reports)
            {
                InsertCustomReportScheduleForLogging(reportsByTemplateNameTemplateIdScheduleDestination, report, comparer);
            }
            stringBuilder.Append("Associated Custom Reports: ");
            var current = reportsByTemplateNameTemplateIdScheduleDestination.First;
            foreach (var report in reportsByTemplateNameTemplateIdScheduleDestination)
            {
                LogCustomReportSchedule(group, stringBuilder, report);
                stringBuilder.Append(current != reportsByTemplateNameTemplateIdScheduleDestination.Last ? "; " : ".");
                current = current.Next;
            }
            if (addEndOfLine)
            {
                stringBuilder.Append(Environment.NewLine);
            }

            return true;
        }

        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="TNameEntity"></typeparam>
        /// <param name="stringBuilder"></param>
        /// <param name="nameEntities"></param>
        /// <param name="addEndOfLine">add end of line if there was anything to log</param>
        /// <returns>true if there was anything to log</returns>
        static bool LogOffendingNameEntityClass<TNameEntity>(StringBuilder stringBuilder, IList<TNameEntity> nameEntities, bool addEndOfLine) where TNameEntity : NameEntity
        {
            if (nameEntities == null || nameEntities.Count < 1)
            {
                return false;
            }
            if (addEndOfLine)
            {
                stringBuilder.Append(Environment.NewLine);
            }
            stringBuilder.Append("Associated ").Append(typeof(TNameEntity).Name).Append("s: ");
            for (var i = 0; i < nameEntities.Count; i++)
            {
                stringBuilder.Append("<").Append(nameEntities[i].Name).Append(">").Append(i < nameEntities.Count - 1 ? ", " : ".");
            }
            return true;
        }

        bool AreUpdateableGroupFieldsEqual(Group groupParsed, Group groupFromDB)
        {
            return groupParsed.Name.Equals(groupFromDB.Name, StringComparison.CurrentCultureIgnoreCase)
                            && groupParsed.Color.Equals(groupFromDB.Color)
                            && groupParsed.Comments.Equals(groupFromDB.Comments, StringComparison.CurrentCultureIgnoreCase);
        }

        void DeleteGroupsFromDB(IReadOnlyCollection<Group> groupTreesToDelete)
        {
            var groupDeleteIterator = new GroupPostOrderIterator(groupTreesToDelete, importStatusLookup);
            foreach (var group in groupDeleteIterator)
            {
                try
                {
                    var groupParsedWithOldParentData = GetGroupWithParentData(group, false);
                    var status = EntityImportStatus.DeletionCandidate;
                    if (deleteEmptyGroups)
                    {
                        api.Call<object>("Remove", typeof(Group), new { entity = group });
                        status = EntityImportStatus.Deleted;
                    }
                    OnEntityImported(new EntityImportedEventArgs<GroupWithLoggingData>(groupParsedWithOldParentData, status));
                }
                catch (Exception exception)
                {
                    if (!(exception is GroupRelationViolatedException groupRelationViolatedException))
                    {
                        var groupParsedWithOldParentData = GetGroupWithParentData(group, false);
                        OnEntityImported(new EntityImportedEventArgs<GroupWithLoggingData>(groupParsedWithOldParentData, EntityImportStatus.Failed, exception));
                    }
                    else
                    {
                        PopulateRelations(groupRelationViolatedException.Relations);
                        var groupParsedWithOldParentData = GetGroupWithParentData(group, false, groupRelationViolatedException.Relations);
                        if (moveAssetsUp)
                        {
                            MoveAssetsUp(groupParsedWithOldParentData);
                        }
                        else
                        {
                            OnEntityImported(new EntityImportedEventArgs<GroupWithLoggingData>(groupParsedWithOldParentData, EntityImportStatus.CannotDeleteNotEmpty));
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Determines the group import status for groups from database. Prerequisite: parsed groups import status must be determined first.
        /// </summary>
        /// <returns>Roots of <see cref="Group"/> trees to delete from DB</returns>
        /// <exception cref="System.ApplicationException"> thrown Parent of Group in question is not set or without import status
        /// </exception>
        LinkedList<Group> DetermineGroupDeleteStatusForGroupsFromDB()
        {
            var groupIterator = new GroupBreadthFirstIterator(firstLineParentGroupFromDB);
            var groupTreesToDelete = new LinkedList<Group>();
            foreach (var groupFromDB in groupIterator)
            {
                // do not analyze tree root group, should not be deleted or otherwise changed by import anyway
                if (groupFromDB == firstLineParentGroupFromDB)
                {
                    continue;
                }
                if (groupFromDB.Reference == null)
                {
                    throw new ApplicationException($"Terminate: in {nameof(DetermineGroupDeleteStatusForGroupsFromDB)}, group <{groupFromDB.Name}> child of <{groupFromDB.Parent.Name}> in Database has NULL sReference. Groups managed by ImportGroups need sReferences in the Database");
                }
                if (!importStatusLookup.TryGetValue(groupFromDB.Reference, out EntityImportStatus _))
                {
                    importStatusLookup.Add(groupFromDB.Reference, EntityImportStatus.Deleted);
                    if (groupFromDB.Parent != null)
                    {
                        if (groupFromDB.Parent == firstLineParentGroupFromDB)
                        {
                            groupTreesToDelete.AddLast(groupFromDB);
                        }
                        else if (importStatusLookup.TryGetValue(groupFromDB.Parent.Reference, out EntityImportStatus parentStatus))
                        {
                            if (parentStatus != EntityImportStatus.Deleted)
                            {
                                groupTreesToDelete.AddLast(groupFromDB);
                            }
                        }
                        else
                        {
                            throw new ApplicationException($"Terminate: in {nameof(DetermineGroupDeleteStatusForGroupsFromDB)}, {nameof(groupFromDB.Parent)} import status shall have been determined)");
                        }
                    }
                    else
                    {
                        throw new ApplicationException($"Terminate: in {nameof(DetermineGroupDeleteStatusForGroupsFromDB)}, {nameof(groupFromDB.Parent)} shall not be null");
                    }
                }
            }
            return groupTreesToDelete;
        }

        void DetermineGroupImportStatusForParsedGroups()
        {
            var groupIterator = new GroupBreadthFirstIterator(firstLineParentGroupParsed);
            if (firstLineParentGroupParsed.Id == null)
            {
                throw new ApplicationException($"Terminate: in {nameof(DetermineGroupImportStatusForParsedGroups)} {nameof(firstLineParentGroupParsed.Id)} shall not be null");
            }
            var iterationCount = 0;
            foreach (var groupParsed in groupIterator)
            {
                // do not analyze tree root group, should not be imported anyway
                if (iterationCount == 0)
                {
                    iterationCount++;
                    continue;
                }
                if (!groupLookupFromDB.TryGetValue(groupParsed.Reference, out Group groupFromDB))
                {
                    importStatusLookup.Add(groupParsed.Reference, EntityImportStatus.Added);
                }
                else
                {
                    // Sanity Check
                    if (groupFromDB.Id == null)
                    {
                        throw new ApplicationException($"Terminate: in {nameof(DetermineGroupImportStatusForParsedGroups)} {nameof(groupFromDB.Id)} shall not be null");
                    }

                    // Set Entity.Id
                    groupParsed.Id = groupFromDB.Id;

                    // Is parent the same
                    if (groupParsed.Parent.Id == groupFromDB.Parent.Id)
                    {
                        if (AreUpdateableGroupFieldsEqual(groupParsed, groupFromDB))
                        {
                            importStatusLookup.Add(groupParsed.Reference, EntityImportStatus.Existing);
                        }
                        else
                        {
                            importStatusLookup.Add(groupParsed.Reference, EntityImportStatus.Updated);
                        }
                    }
                    else
                    {
                        if (AreUpdateableGroupFieldsEqual(groupParsed, groupFromDB))
                        {
                            importStatusLookup.Add(groupParsed.Reference, EntityImportStatus.MovedExisting);
                        }
                        else
                        {
                            importStatusLookup.Add(groupFromDB.Reference, EntityImportStatus.MovedUpdated);
                        }
                    }
                }

                iterationCount++;
            }
        }

        /// <summary>
        /// if <paramref name="fillOldParentData"/> passed true, caller must ensure <paramref name="group"/> existed in DB prior to import attempt
        /// </summary>
        /// <param name="group">group</param>
        /// <param name="fillOldParentData">true if existed in DB prior to import</param>
        /// <param name = "relations"><see cref="GroupRelations"/> for the group</param>
        GroupWithLoggingData GetGroupWithParentData(Group group, bool fillOldParentData, GroupRelations relations = null)
        {
            if (!fillOldParentData)
            {
                return new GroupWithLoggingData(group, string.Empty, string.Empty, relations);
            }
            if (groupLookupFromDB.TryGetValue(group.Reference, out Group groupFromDB))
            {
                var groupWithOldParentData = new GroupWithLoggingData(group, groupFromDB.Parent.Name, groupFromDB.Parent.Reference, relations);
                return groupWithOldParentData;
            }
            throw new InvalidOperationException($"Group with Sreference {group.Reference} is not in lookupFromDB");
        }

        void ImportParsedGroups()
        {
            var groupIterator = new GroupBreadthFirstIterator(firstLineParentGroupParsed);
            var iterationCount = 0;
            foreach (var groupParsed in groupIterator)
            {
                // do not analyze tree root group, should not be imported anyway
                if (iterationCount == 0)
                {
                    iterationCount++;
                    continue;
                }
                var groupParsedWithOldParentData = GetGroupWithParentData(groupParsed, false);
                try
                {
                    if (!importStatusLookup.TryGetValue(groupParsed.Reference, out EntityImportStatus status))
                    {
                        throw new ApplicationException("Import Status was not set before import attempt.");
                    }
                    switch (status)
                    {
                        case EntityImportStatus.Existing:
                            break;

                        case EntityImportStatus.Added:
                            groupParsed.Id = api.Call<Id>("Add", typeof(Group), new { entity = groupParsed });
                            break;

                        case EntityImportStatus.Updated:
                        case EntityImportStatus.MovedExisting:
                        case EntityImportStatus.MovedUpdated:
                            api.Call<object>("Set", typeof(Group), new { entity = groupParsed });
                            groupParsedWithOldParentData = GetGroupWithParentData(groupParsed, true);
                            break;

                        default:
                            throw new ApplicationException($"Invalid Import Status: {status}.");
                    }
                    OnEntityImported(new EntityImportedEventArgs<GroupWithLoggingData>(groupParsedWithOldParentData, status));
                }
                catch (Exception exception)
                {
                    OnEntityImported(new EntityImportedEventArgs<GroupWithLoggingData>(groupParsedWithOldParentData, EntityImportStatus.Failed, exception));
                }
                iterationCount++;
            }
        }

        void MoveAssetsUp(GroupWithLoggingData group)
        {
            throw new NotSupportedException($"{nameof(MoveAssetsUp)} not yet implemented, cannot use flag -m");
        }

        void PopulateEntitiesFromDB<TEntity, TEntitySearch>(IList<TEntity> entities)
                where TEntity : Entity
        where TEntitySearch : Search, new()
        {
            if (entities == null || entities.Count < 1)
            {
                return;
            }
            try
            {
                // Non-multicall alterntive, keep for reference
                //for (; i < zones.Count; i++)
                //{
                //    var zoneSearch = new ZoneSearch(zones[i].Id);
                //    var zonesFromDB = api.Call<List<Zone>>("Get", typeof(Zone), new { search = zoneSearch } );
                //    Debug.Assert(1 == zonesFromDB.Count, $"Zone count {zonesFromDB.Count} is greater than 1 for Id {zones[i].Id}!");
                //    zones[i] = zonesFromDB[0];
                //}
                var calls = new List<object>();
                for (var i = 0; i < entities.Count; i++)
                {
                    var entitySearch = new TEntitySearch
                    {
                        Id = entities[i].Id
                    };
                    calls.Add(new object[] { "Get", typeof(TEntity), new { search = entitySearch }, typeof(List<TEntity>) });
                }
                var results = api.MultiCall(calls.ToArray());
                for (var i = 0; i < results?.Count; i++)
                {
                    if (results[i] is List<TEntity> entitiesFromDB && entitiesFromDB.Count > 0)
                    {
                        Debug.Assert(1 == entitiesFromDB.Count, $"{typeof(TEntity)} count {entitiesFromDB.Count} is greater than 1 for Id {entities[i].Id}!");
                        entities[i] = entitiesFromDB[0];
                    }
                }
            }
            catch (Exception exception)
            {
                // Non-multicall alterntive, keep for reference
                //OnGroupRelatedEntityPopulationFailed(new EntityImportedEventArgs<NameEntity>(zones[i], EntityImportStatus.Failed, exception));
                // TODO: manually test if the line below works by stopping the web server
                OnGroupRelatedEntityPopulationFailed(new EntityImportedEventArgs<Entity>(entities[0], EntityImportStatus.Failed, exception));
            }
        }

        bool PopulateNameEntitiesFromDB<TAsset, TAssetSearch>(IList<TAsset> nameEntity)
            where TAsset : NameEntity
            where TAssetSearch : Search, new()
        {
            if (nameEntity == null || nameEntity.Count < 1)
            {
                return false;
            }
            try
            {
                var calls = new List<object>();
                for (var i = 0; i < nameEntity.Count; i++)
                {
                    var nameEntitySearch = new TAssetSearch
                    {
                        Id = nameEntity[i].Id
                    };
                    calls.Add(new object[] { "Get", typeof(TAsset), new { search = nameEntitySearch }, typeof(List<TAsset>) });
                }
                var results = api.MultiCall(calls.ToArray());
                for (var i = 0; i < results?.Count; i++)
                {
                    if (results[i] is List<TAsset> nameEntitiesFromDB && nameEntitiesFromDB.Count > 0)
                    {
                        Debug.Assert(1 == nameEntitiesFromDB.Count, $"{typeof(TAsset)} count {nameEntitiesFromDB.Count} is greater than 1 for Id {nameEntity[i].Id}!");
                        nameEntity[i] = nameEntitiesFromDB[0];
                    }
                }
                return true;
            }
            catch (Exception exception)
            {
                // TODO: manually test if the line below works by stopping the web server
                OnGroupRelatedNameEntityPopulationFailed(new EntityImportedEventArgs<NameEntity>(nameEntity[0], EntityImportStatus.Failed, exception));
            }
            return false;
        }

        //void PopulateNestedEntitiesFromDB<TParent, TParentSearch, TChild, TChildSearch>(IList<TParent> parentEntities, Func<TParent, TChild> navigationProperty)
        void PopulateNestedEntitiesFromDB<TParent, TParentSearch, TChild, TChildSearch>(IList<TParent> parentEntities, string childPropertyName)
            where TParent : Entity
            where TParentSearch : Search, new()
            where TChild : Entity
            where TChildSearch : Search, new()
        {
            if (parentEntities == null || parentEntities.Count < 1)
            {
                return;
            }

            PopulateEntitiesFromDB<TParent, TParentSearch>(parentEntities);
            var childProperty = typeof(TParent).GetProperty(childPropertyName);
            var childPropertyGet = childProperty.GetGetMethod();
            var childPropertySet = childProperty.GetSetMethod();
            var childEntities = new List<TChild>(parentEntities.Count);
            foreach (var parentEntity in parentEntities)
            {
                //childEntities.Add(navigationProperty.Invoke(parentEntities[i]));
                childEntities.Add((TChild)childPropertyGet.Invoke(parentEntity, null));
            }
            PopulateEntitiesFromDB<TChild, TChildSearch>(childEntities);
            for (var i = 0; i < childEntities.Count; i++)
            {
                childPropertySet.Invoke(parentEntities[i], new[] { childEntities[i] });
            }
        }

        void PopulateRelations(GroupRelations relations)
        {
            PopulateNameEntitiesFromDB<Zone, ZoneSearch>(relations.Zones);
            PopulateNameEntitiesFromDB<Device, DeviceSearch>(relations.Devices);
            PopulateNameEntitiesFromDB<User, UserSearch>(relations.Users);
            PopulateNameEntitiesFromDB<Rule, RuleSearch>(relations.Rules);

            // relation.Drivers is of List<User> type
            PopulateNameEntitiesFromDB<User, UserSearch>(relations.Drivers);
            PopulateNestedEntitiesFromDB<CustomReportSchedule, Search, ReportTemplate, Search>(relations.CustomReportSchedules, nameof(CustomReportSchedule.Template));

            //TODO: more assets
        }

        public class GroupWithLoggingData
        {
            public GroupWithLoggingData(Group group, string nameOfParentInDB, string sReferenceOfParentInDB, GroupRelations relations = null)
            {
                Group = group;
                NameOfParentInDB = nameOfParentInDB;
                SreferenceOfParentInDB = sReferenceOfParentInDB;
                Relations = relations;
            }

            public Group Group { get; }

            public string NameOfParentInDB { get; }

            public GroupRelations Relations { get; }

            public string SreferenceOfParentInDB { get; }
        }
    }
}
