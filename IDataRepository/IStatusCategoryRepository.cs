using System.Collections.Generic;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IStatusCategoryRepository
    {
        IEnumerable<StatusCategory> ListAll();
        StatusCategory GetStatusCategory(int statusCategoryId);
    }
}