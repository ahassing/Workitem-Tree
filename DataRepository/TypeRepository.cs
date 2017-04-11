using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;

namespace Feature_Tree.DataRepository 
{
    public class TypeRepository : ITypeRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public TypeRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<IssueType> getIssueTypes()
        {
          return  _dbContext.IssueTypes.ToList();
        }

        public IssueType getIssueType(int id)
        {
            return _dbContext.IssueTypes.FirstOrDefault();
        }
    }
}
