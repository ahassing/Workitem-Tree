using System.ComponentModel.DataAnnotations;

namespace Feature_Tree.Models
{
    public class IssueType
    {
        [Key]
        public int TypeId { get; set; }
        public string TypeName { get; set; }
    }
}