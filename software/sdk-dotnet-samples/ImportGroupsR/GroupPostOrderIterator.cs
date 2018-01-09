using System;
using System.Collections;
using System.Collections.Generic;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    /// <summary>
    /// Postorder - visit children from Right to Left before the Parent, unusual order for easier initialization
    /// </summary>
    /// <seealso cref="System.Collections.Generic.IEnumerable{Group}" />
    class GroupPostOrderIterator : IEnumerable<Group>
    {
        readonly IReadOnlyCollection<Group> groupTreesToDelete;
        readonly IReadOnlyDictionary<string, EntityImportStatus> importStatusLookup;
        readonly Stack<Group> stack = new Stack<Group>();

        /// <summary>
        /// Initializes a new instance of the <see cref="GroupPostOrderIterator" /> class.
        /// </summary>
        /// <param name="groupTreesToDelete">
        ///   <see cref="LinkedList{T}" /> of roots of <see cref="Group" />s to delete</param>
        /// <param name="importStatusLookup">The import status lookup.</param>
        public GroupPostOrderIterator(IReadOnlyCollection<Group> groupTreesToDelete, IReadOnlyDictionary<string, EntityImportStatus> importStatusLookup)
        {
            this.groupTreesToDelete = groupTreesToDelete;
            this.importStatusLookup = importStatusLookup;
        }

        /// <summary>
        /// Returns an enumerator that iterates through the collection.
        /// </summary>
        /// <returns>
        /// An enumerator that can be used to iterate through the collection.
        /// </returns>
        public IEnumerator<Group> GetEnumerator()
        {
            stack.Clear();
            foreach (var root in groupTreesToDelete)
            {
                StackNodeAndItsChildren(root);
            }
            while (stack.Count > 0)
            {
                var currentGroup = stack.Pop();
                yield return currentGroup;
            }
        }

        /// <summary>
        /// Returns an enumerator that iterates through a collection.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Collections.IEnumerator" /> object that can be used to iterate through the collection.
        /// </returns>
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        void StackNodeAndItsChildren(Group node)
        {
            if (importStatusLookup.TryGetValue(node.Reference, out EntityImportStatus status))
            {
                if (status == EntityImportStatus.Deleted)
                {
                    stack.Push(node);
                }
                foreach (var childNode in node.Children)
                {
                    StackNodeAndItsChildren(childNode);
                }
            }
            else
            {
                throw new ApplicationException($"Terminate: in {nameof(StackNodeAndItsChildren)}, {nameof(EntityImportStatus)} for {nameof(Group.Reference)} of {node.Reference} is missing.");
            }
        }
    }
}