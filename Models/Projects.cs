using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Projects
    {
        public Projects()
        {
            Issues = new HashSet<Issues>();
        }

        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; }

        public virtual ICollection<Issues> Issues { get; set; }
    }
}
