using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IUserRepository
    {
        IEnumerable<User> ListAll();
        User GetUser(Guid userId);
    }
}
