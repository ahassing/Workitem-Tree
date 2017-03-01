using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class User
    {
        public User()
        {
            IssuesIssueAssignedUser = new HashSet<Issue>();
            IssuesIssueCreatorUser = new HashSet<Issue>();
            IssuesIssueOwnerUser = new HashSet<Issue>();
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserImagePath { get; set; }

        public virtual ICollection<Issue> IssuesIssueAssignedUser { get; set; }
        public virtual ICollection<Issue> IssuesIssueCreatorUser { get; set; }
        public virtual ICollection<Issue> IssuesIssueOwnerUser { get; set; }
    }
}
