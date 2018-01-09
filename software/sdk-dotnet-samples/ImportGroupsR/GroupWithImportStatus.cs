using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    /// <summary>
    /// Group with Import Status
    /// </summary>
    /// <seealso cref="Geotab.Checkmate.ObjectModel.Group" />
    class GroupWithImportStatus
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GroupWithImportStatus"/> class.
        /// </summary>
        /// <param name="group">The group.</param>
        /// <param name="importStatus">The import status.</param>
        public GroupWithImportStatus(Group group, EntityImportStatus importStatus)
        {
            Group = group;
            ImportStatus = importStatus;
        }

        /// <summary>
        /// Gets or sets the import status.
        /// </summary>
        /// <value>
        /// The import status.
        /// </value>
        public EntityImportStatus ImportStatus { get; set; }

        /// <summary>
        /// Gets or sets the group.
        /// </summary>
        /// <value>
        /// The group.
        /// </value>
        public Group Group { get; set; }
    }
}
