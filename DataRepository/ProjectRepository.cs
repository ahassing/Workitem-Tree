using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;
using Microsoft.EntityFrameworkCore;


namespace Feature_Tree.DataRepository
{
    public class ProjectRepository : IProjectRepository
    {

        private readonly BTFeatureTreeContext _dbContext;
        public ProjectRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Project> ListAll()
        {
            return _dbContext.Projects.ToList();
        }

        public Project GetProject(int projectId)
        {
            return _dbContext.Projects.Where(c => c.ProjectId == projectId).FirstOrDefault();
        }

        public int UpdateProject(Project value)
        {
            _dbContext.Entry(value).State = EntityState.Modified;

            var project = _dbContext.SaveChanges();

            return project;
        }

        public Project CreateProject(Project value)
        {
            _dbContext.Entry(value).State = EntityState.Added;

            _dbContext.SaveChanges();


            return null;
        }

    }
}
