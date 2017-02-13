using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Priority
    {
        public Priority()
        {
            Issues = new HashSet<Issues>();
        }

        public int PriorityId { get; set; }
        public string PriorityName { get; set; }

        public virtual ICollection<Issues> Issues { get; set; }
    }
}
