namespace Geotab.SDK.ImportGroupsR
{
    public enum EntityImportStatus
    {
        /// <summary>
        /// Not determined yet
        /// </summary>
        Undefined,

        /// <summary>
        /// The Entity was added
        /// </summary>
        Added,

        /// <summary>
        /// The Entity was updated
        /// </summary>
        Updated,

        /// <summary>
        /// The Entity already exists
        /// </summary>
        Existing,

        /// <summary>
        /// The Entity was endated
        /// </summary>
        EndDated,

        /// <summary>
        /// The Entity was deleted
        /// </summary>
        Deleted,

        /// <summary>
        /// The Entity was deleted
        /// </summary>
        DeletionCandidate,

        /// <summary>
        /// The Entity was not imported
        /// </summary>
        Failed,

        /// <summary>
        /// Failed to end date the entity
        /// </summary>
        FailedToEndDate,

        /// <summary>
        /// Moved entity to another parent without updating its fields
        /// </summary>
        MovedExisting,

        /// <summary>
        /// Moved entity to another parent and updated its fields
        /// </summary>
        MovedUpdated,

        /// <summary>
        /// Cannot delete group that is not empty
        /// </summary>
        CannotDeleteNotEmpty
    }
}