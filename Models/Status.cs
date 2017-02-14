using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Status
    {
        public Status()
        {
            Issues = new HashSet<Issue>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int StatusCatId { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }
        public virtual StatusCategory StatusCat { get; set; }
    }
}
