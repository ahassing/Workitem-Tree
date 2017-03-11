using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IProjectRepository
    {
        IEnumerable<Project> ListAll();
        Project GetProject(int projectId);
        int UpdateProject(Project project);
        Project CreateProject(Project project);
    }
}
