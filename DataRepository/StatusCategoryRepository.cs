using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;

namespace Feature_Tree.DataRepository
{
    public class StatusCategoryRepository : IStatusCategoryRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public StatusCategoryRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<StatusCategory> ListAll()
        {
            return _dbContext.StatusCategory.ToList();
        }

        public StatusCategory GetStatusCategory(int statusCategoryId)
        {
            return _dbContext.StatusCategory.Where(c => c.StatusCatId == statusCategoryId).FirstOrDefault();
        }
    }
}
