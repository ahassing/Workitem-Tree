﻿using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Project
    {
        public Project()
        {
            Issues = new HashSet<Issue>();
        }

        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }
    }
}
