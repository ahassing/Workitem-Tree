using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.IDataRepository;
using Feature_Tree.Models;
using Microsoft.EntityFrameworkCore;

namespace Feature_Tree.DataRepository
{
    public class StatusRepository : IStatusRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public StatusRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Status> ListAll()
        {
            //return _dbContext.Status.AsEnumerable();

			return _dbContext.Status
                    .FromSql("upProc_Status_Select").ToList();
        }

        public Status GetStatus (int statusId)
        {
            return _dbContext.Status
                .FromSql("upProc_Status_Select {0}", statusId).First();
        }

    }
}
