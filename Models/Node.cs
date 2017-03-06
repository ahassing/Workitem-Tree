using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Feature_Tree.Models
{
    public class Node
    {
        public Node() {
            Children = new List<Node>();
        }

        public int IssueId { get; set; }
        public String IssueTitle { get; set; }
        public String ProjectTitle { get; set; }
        public String UserName { get; set; }
        public String IssueDescription { get; set; }
        public String PriorityName { get; set; }
        public String StatusName { get; set; }
        public String StatusCatName { get; set; }
        public String StatusCatColor { get; set; }
        public String TypeName { get; set; }
        public String UserAvatarPath { get; set; }
        public String PriorityImage { get; set; }
        public int? DependentOn { get; set; }
        public  List<Node> Children { get; set; }
    }
}
