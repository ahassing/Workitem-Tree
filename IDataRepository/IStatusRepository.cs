using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IStatusRepository
    {
        IEnumerable<Status> ListAll();
        Status GetStatus(int statusId);
    }
}