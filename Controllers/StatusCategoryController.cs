using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Feature_Tree.IDataRepository;
using Feature_Tree.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Feature_Tree.Controllers
{
    [Route("api/[controller]")]
    public class StatusCategoryController : Controller
    {

        private readonly IStatusCategoryRepository _BTfeatureTreeRepository;

        public StatusCategoryController(IStatusCategoryRepository BTfeatureTreeRepository)
        {
            _BTfeatureTreeRepository = BTfeatureTreeRepository;
        }

        // GET: api/statusCategory
        [HttpGet]
        public IEnumerable<StatusCategory> Get()
        {
            return _BTfeatureTreeRepository.ListAll();
        }

        // GET api/statusCategory/5
        [HttpGet("{id}")]
        public StatusCategory Get(int id)
        {
            return _BTfeatureTreeRepository.GetStatusCategory(id);
        }

        // POST api/statusCategory
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/statusCategory/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/statusCategory/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
