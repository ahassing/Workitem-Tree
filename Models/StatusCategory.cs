using System;
using System.Collections.Generic;

namespace Feature_Tree.Models
{
    public partial class StatusCategory
    {
        public StatusCategory()
        {
            Status = new HashSet<Status>();
        }

        public int StatusCatId { get; set; }
        public string StatusCatName { get; set; }

        public virtual ICollection<Status> Status { get; set; }
    }
}
