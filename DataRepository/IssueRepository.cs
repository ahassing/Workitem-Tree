using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.IDataRepository;
using Feature_Tree.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace Feature_Tree.DataRepository
{
    public class IssueRepository : IIssueRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public IssueRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Issue> ListAll()
        {
            //List<Issue> issues =  _dbContext.Issues
            //    .FromSql("upProc_Issues_Select").ToList();

            //return issues;
            return _dbContext.Issues.ToList();

        }

        public Issue GetIssue(int id)
        {
            var issueId = new SqlParameter("@IssueId", id);

            //return _dbContext.Issues
            //        .FromSql("upProc_Issues_Select @IssueId", issueId).First();
            return _dbContext.Issues.Where(c => c.IssueId == id).FirstOrDefault();

        }

        public int UpdateIssue(Issue value)
        {
            _dbContext.Entry(value).State = EntityState.Modified;

          var issue =  _dbContext.SaveChanges();

            return issue;
        }

        public Issue CreateIssue(Issue value)
        {
            value.IssueCreatorUserId = value.IssueAssignedUserId;
            value.IssueOwnerUserId = value.IssueAssignedUserId;
            value.DateCreated = DateTime.Now;
            value.IssueDescription = value.IssueDescription == null ? "" : value.IssueDescription;
            _dbContext.Entry(value).State = EntityState.Added;

            _dbContext.SaveChanges();


            return null;
        }

    }
}
