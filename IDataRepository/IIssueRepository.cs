using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IIssueRepository
    {
        IEnumerable<Issue> ListAll();
        Issue GetIssue(int id);
        int UpdateIssue(Issue issue);
        Issue CreateIssue(Issue issues);
    }
}
