﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Feature_Tree.Models
{
    public partial class Issue
    {
        [Key]
        public int IssueId { get; set; }
        public string IssueTitle { get; set; }
        [Required]
        public string IssueDescription { get; set; }
  
        public int IssueStatusId { get; set; }
  
        public int IssuePriorityId { get; set; }
        [ForeignKey("FK_Issues_TypeId")]
        public int IssueType { get; set; }
  
        public Guid IssueCreatorUserId { get; set; }
  
        public Guid IssueAssignedUserId { get; set; }
  
        public Guid IssueOwnerUserId { get; set; }
        
        public DateTime DateCreated { get; set; }
  
        public int? DependentOn { get; set; }
  
        public int IssueProjectId { get; set; }


        //public virtual Issue DependentOnNavigation { get; set; }
        //public virtual ICollection<Issue> InverseDependentOnNavigation { get; set; }
        public virtual User IssueAssignedUser { get; set; }
        public virtual User IssueCreatorUser { get; set; }
        public virtual User IssueOwnerUser { get; set; }
        public virtual Priority IssuePriority { get; set; }
        public virtual Project IssueProject { get; set; }
        public virtual Status IssueStatus { get; set; }
    }
}
