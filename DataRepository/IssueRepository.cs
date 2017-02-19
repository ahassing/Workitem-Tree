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

        public Issue CreateIssue(Issue value)
        {
            //try {
                _dbContext.Issues
                    .FromSql("upProc_Issue_Insert {0} {1} {3} {4} {5} {6} {7} {8}" 
                    ,value.IssueTitle, value.IssueDescription,value.IssueStatusId,value.IssuePriorityId,
                    value.IssueCreatorUserId,value.IssueAssignedUserId,value.DependentOn,value.IssueProjectId);
            //}
            //catch (Exception e)
            //{

            //}
            return null;
        }

    }
}
