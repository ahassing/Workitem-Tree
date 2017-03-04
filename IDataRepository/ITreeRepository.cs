using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Microsoft.AspNetCore.Mvc;

namespace Feature_Tree.IDataRepository
{
  public  interface ITreeRepository
    {
        List<Node> GetTree(int projectId);
    }

}
