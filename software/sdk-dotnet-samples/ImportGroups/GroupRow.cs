namespace Geotab.SDK.ImportGroups
{
    /// <summary>
    /// Models a row from a file with group data.
    /// </summary>
    class GroupRow
    {
        /// <summary>
        /// This group name
        /// </summary>
        public string GroupName;

        /// <summary>
        /// The parent group name
        /// </summary>
        public string ParentGroupName;

        /// <inheritdoc/>
        public override string ToString()
        {
            if (string.IsNullOrEmpty(GroupName))
            {
                return base.ToString();
            }
            return ParentGroupName ?? "-->" + GroupName;
        }
    }
}
