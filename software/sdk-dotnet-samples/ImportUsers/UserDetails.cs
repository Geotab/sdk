using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportUsers
{
    /// <summary>
    /// Object with the users details
    /// </summary>
    class UserDetails
    {
        /// <summary>
        /// The organization node names
        /// </summary>
        public readonly string OrganizationNodeNames;

        /// <summary>
        /// The security node name
        /// </summary>
        public readonly string SecurityNodeName;

        /// <summary>
        /// The user
        /// </summary>
        public readonly User User;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserDetails"/> class.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="organizationNodes">The organization nodes.</param>
        /// <param name="securityNodes">The security nodes.</param>
        public UserDetails(User user, string organizationNodes, string securityNodes)
        {
            User = user;
            OrganizationNodeNames = organizationNodes;
            SecurityNodeName = securityNodes;
        }
    }
}