using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Feature_Tree.Models
{
    public class Issue
    {
        public int IssueId { get; set; }
        public String IssueTitle { get; set; }
        public int IssueStatusId { get; set; }
        public int IssuePriorityId { get; set; }
        public Guid IssueCreatorUserId { get; set; }
        public Guid IssueAssignedUserId { get; set; }
        public Guid IssueOwnerUserId { get; set; }
        public DateTime DateCreated { get; set; }
        public int DependentOn { get; set; }
    }
}
