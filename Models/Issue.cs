using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Feature_Tree.Models
{
    public partial class Issue
    {
        [DataMember]
        public int IssueId { get; set; }
        [DataMember]
        public string IssueTitle { get; set; }
        [DataMember]
        public string IssueDescription { get; set; }
        [DataMember]
        public int IssueStatusId { get; set; }
        [DataMember]
        public int IssuePriorityId { get; set; }
        [DataMember]
        public Guid IssueCreatorUserId { get; set; }
        [DataMember]
        public Guid IssueAssignedUserId { get; set; }
        [DataMember]
        public Guid IssueOwnerUserId { get; set; }
        [DataMember]
        public DateTime DateCreated { get; set; }
        [DataMember]
        public int? DependentOn { get; set; }
        [DataMember]
        public int IssueProjectId { get; set; }
        [DataMember]

        public virtual Issue DependentOnNavigation { get; set; }
        public virtual ICollection<Issue> InverseDependentOnNavigation { get; set; }
        public virtual User IssueAssignedUser { get; set; }
        public virtual User IssueCreatorUser { get; set; }
        public virtual User IssueOwnerUser { get; set; }
        public virtual Priority IssuePriority { get; set; }
        public virtual Projects IssueProject { get; set; }
        public virtual Status IssueStatus { get; set; }
    }
}
