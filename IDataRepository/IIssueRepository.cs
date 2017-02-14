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
        IEnumerable<Issue> GetIssue(int id);
        Issue CreateIssue(Issue issues);
    }
}
