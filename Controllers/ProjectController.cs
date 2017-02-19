using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Feature_Tree.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {

        private readonly IProjectRepository _BTfeatureTreeRepository;

        public ProjectController(IProjectRepository BTfeatureTreeRepository)
        {
            _BTfeatureTreeRepository = BTfeatureTreeRepository;
        }

        // GET: api/project
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return _BTfeatureTreeRepository.ListAll();
        }

        // GET api/project/5
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _BTfeatureTreeRepository.GetProject(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
