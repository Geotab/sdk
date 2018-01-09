using System.Collections;
using System.Collections.Generic;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    /// <summary>
    /// Breadth First Search Iterator, responsibility of the caller to ensure that
    /// before every iteration or the entire for each loop, child <see cref="Group"/> references in <see cref="Group.Children"/> have their children populated
    /// </summary>
    class GroupBreadthFirstIterator : IEnumerable<Group>
    {
        readonly Group root;

        /// <summary>
        /// Initializes a new instance of the <see cref="GroupBreadthFirstIterator" /> class.
        /// </summary>
        /// <param name="root">The root <see cref="Group"/> from which enumeration starts.</param>
        public GroupBreadthFirstIterator(Group root)
        {
            this.root = root;
        }

        /// <summary>
        /// Returns an enumerator that iterates through the collection.
        /// </summary>
        /// <returns>
        /// An enumerator that can be used to iterate through the collection.
        /// </returns>
        public IEnumerator<Group> GetEnumerator()
        {
            Queue<Group> queue = new Queue<Group>();
            queue.Enqueue(root);
            while (queue.Count > 0)
            {
                var currentGroup = queue.Dequeue();
                yield return currentGroup;

                // the caller of the iterator replaces children references with fully populated Group references
                // any Group ending up on the queue is fully populated, not just Id
                foreach (var childGroup in currentGroup.Children)
                {
                    queue.Enqueue(childGroup);
                }
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
    }
}