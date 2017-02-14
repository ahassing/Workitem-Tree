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
    public class IssuesRepository : IIssuesRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public IssuesRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Issues> ListAll()
        {
            return _dbContext.Issues.AsEnumerable();
        }

        public IEnumerable<Issues> GetIssue(int id)
        {
            var issueId = new SqlParameter("@IssueId", id);

            return _dbContext.Issues
                    .FromSql("upProc_Issues_Select @IssueId", issueId);
        }

        public Issues CreateIssue(Issues value)
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
