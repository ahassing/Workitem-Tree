using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class Status
    {
        public Status()
        {
            Issues = new HashSet<Issues>();
        }

        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int StatusCatId { get; set; }

        public virtual ICollection<Issues> Issues { get; set; }
        public virtual StatusCategory StatusCat { get; set; }
    }
}
