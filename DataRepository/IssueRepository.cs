using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.IDataRepository;
using Feature_Tree.Models;

namespace Feature_Tree.DataRepository
{
    public class IssueRepository : IIssueRepository
    {
        private readonly FeatureTreeContext _dbContext;
        public IssueRepository(FeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Issue> ListAll()
        {
            return _dbContext.Issues.AsEnumerable();
        }

    }
}
