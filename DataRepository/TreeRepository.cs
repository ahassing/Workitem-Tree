using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;
using Feature_Tree.IDataRepository;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Feature_Tree.DataRepository
{
    public class TreeRepository : ITreeRepository
    {
        private readonly BTFeatureTreeContext _dbContext;
        public TreeRepository(BTFeatureTreeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Node GetTree(int projectId)
        {
            List <Node> nodes = new List<Node>();
         var issues = from issue in _dbContext.Issues
                      join priority in _dbContext.Priority on issue.IssuePriorityId equals priority.PriorityId 
                      join status in _dbContext.Status on issue.IssueStatusId equals status.StatusId
                      join user in _dbContext.Users on issue.IssueAssignedUserId equals user.UserId
                      join project in _dbContext.Projects on issue.IssueProjectId equals project.ProjectId
                      join statusCat in _dbContext.StatusCategory on status.StatusCatId equals statusCat.StatusCatId
                      join issueType in _dbContext.IssueTypes on issue.IssueType equals issueType.TypeId
                      where issue.IssueProjectId == projectId 
                      select new
                      {
                          IssueId = issue.IssueId,
                          ProjectTitle = project.ProjectTitle,
                          IssueTitle = issue.IssueTitle,
                          DependentOn = issue.DependentOn,
                          IssueDescription = issue.IssueDescription,
                          StatusCatColor = statusCat.StatusCatColor,
                          StatusCatName = statusCat.StatusCatName,
                          TypeName = issueType.TypeName,
                          UserName = user.UserName,
                          UserAvatarPath = user.UserImagePath,
                          StatusName = status.StatusName,
                          PriorityName = priority.PriorityName
                      };

            var config = new MapperConfiguration(cfg => cfg.CreateMissingTypeMaps = true);
            var mapper = config.CreateMapper();

            var nodeList = issues.Select(mapper.Map<Node>).ToList();

           Node rootNode = MakeTreeFromFlatList(nodeList);



            return rootNode;
        }

        public Node MakeTreeFromFlatList(IEnumerable<Node> list) {

            var dic = list.ToDictionary(n => n.IssueId, n => n);
            var rootNodes = new List<Node>();
            foreach (var node in list) {
                if (node.DependentOn.HasValue)
                {
                    Node parent = dic[(int)node.DependentOn];
                    parent.Children.Add(node);
                }
                else {
                    rootNodes.Add(node);
                }
            }

            return rootNodes.FirstOrDefault();
        }

    }
}
