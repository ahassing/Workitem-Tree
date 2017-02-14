using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Microsoft.EntityFrameworkCore;
using Feature_Tree.IDataRepository;

namespace Feature_Tree.DataRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public UserRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> ListAll()
        {
            return _dbContext.Users
                    .FromSql("upProc_Users_Select").ToList();
        }

        public User GetUser(Guid userId)
        {
            return _dbContext.Users
                    .FromSql("upProc_Users_Select {0}", userId ).First();
        }
    }
}
