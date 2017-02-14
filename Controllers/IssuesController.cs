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
    public class IssuesController : Controller
    {
        private readonly IIssuesRepository _BTfeatureTreeRepository;

        public IssuesController(IIssuesRepository BTfeatureTreeRepository)
        {
            _BTfeatureTreeRepository = BTfeatureTreeRepository;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Issues> Get()
        {
            var issues = _BTfeatureTreeRepository.ListAll();

            return (issues);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IEnumerable<Issues> Get(int id)
        {
            return _BTfeatureTreeRepository.GetIssue(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Issues value)
        {
            _BTfeatureTreeRepository.CreateIssue(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

    }
}
