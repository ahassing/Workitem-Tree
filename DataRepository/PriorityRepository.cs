using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;
using Microsoft.EntityFrameworkCore;

namespace Feature_Tree.DataRepository
{
    public class PriorityRepository : IPriorityRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public PriorityRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Priority> ListAll()
        {
            return _dbContext.Priority
                .FromSql("upProc_Priority_Select").ToList();
        }

        public Priority GetPriority(int priorityId)
        {
            return _dbContext.Priority
                .FromSql("upProc_Priority_Select {0}", priorityId).First();
        }

    }
}
