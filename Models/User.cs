using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class User
    {
        public User()
        {
            IssuesIssueAssignedUser = new HashSet<Issues>();
            IssuesIssueCreatorUser = new HashSet<Issues>();
            IssuesIssueOwnerUser = new HashSet<Issues>();
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }

        public virtual ICollection<Issues> IssuesIssueAssignedUser { get; set; }
        public virtual ICollection<Issues> IssuesIssueCreatorUser { get; set; }
        public virtual ICollection<Issues> IssuesIssueOwnerUser { get; set; }
    }
}
