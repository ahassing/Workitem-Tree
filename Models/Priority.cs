using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Priority
    {
        public Priority()
        {
            Issues = new HashSet<Issue>();
        }

        public int PriorityId { get; set; }
        public string PriorityName { get; set; }
        public string PriorityImage { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }
    }
}
