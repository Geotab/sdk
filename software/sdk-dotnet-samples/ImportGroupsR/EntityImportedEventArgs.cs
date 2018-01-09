using System;

namespace Geotab.SDK.ImportGroupsR
{
    public class EntityImportedEventArgs<T> : EventArgs
    {
        /// <summary>
        /// The Entity imported entity
        /// </summary>
        public T Entity;

        /// <summary>
        /// Exception in case the import failed. Null otherwise.
        /// </summary>
        public Exception Exception;

        /// <summary>
        /// Import status
        /// </summary>
        public EntityImportStatus Status;

        public EntityImportedEventArgs(T entity, EntityImportStatus status)
        {
            Entity = entity;
            Status = status;
        }

        public EntityImportedEventArgs(T entity, EntityImportStatus status, Exception exception)
        {
            Entity = entity;
            Status = status;
            Exception = exception;
        }
    }
}