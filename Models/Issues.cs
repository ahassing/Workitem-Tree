using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Issues
    {
        public int IssueId { get; set; }
        public string IssueTitle { get; set; }
        public string IssueDescription { get; set; }
        public int IssueStatusId { get; set; }
        public int IssuePriorityId { get; set; }
        public Guid IssueCreatorUserId { get; set; }
        public Guid IssueAssignedUserId { get; set; }
        public Guid IssueOwnerUserId { get; set; }
        public DateTime DateCreated { get; set; }
        public int? DependentOn { get; set; }
        public int IssueProjectId { get; set; }

        public virtual Issues DependentOnNavigation { get; set; }
        public virtual ICollection<Issues> InverseDependentOnNavigation { get; set; }
        public virtual Users IssueAssignedUser { get; set; }
        public virtual Users IssueCreatorUser { get; set; }
        public virtual Users IssueOwnerUser { get; set; }
        public virtual Priority IssuePriority { get; set; }
        public virtual Projects IssueProject { get; set; }
        public virtual Status IssueStatus { get; set; }
    }
}
