-- =================================================================================
-- Create View template for Azure SQL Database and Azure SQL Data Warehouse Database
-- =================================================================================

CREATE VIEW uvNodes AS
SELECT pro.ProjectTitle,
	   pri.PriorityName,
	   us.UserName,
	   sta.StatusCatId,
	   sta.StatusName,
	   sta.StatusCatName,
	   iss.*
FROM [dbo].[issues] as iss
JOIN [dbo].[Priority] as pri
ON iss.IssuePriorityId = pri.PriorityId
JOIN [dbo].[projects] as pro
ON iss.IssueProjectId = pro.ProjectId
JOIN [dbo].[Users] as us
ON iss.IssueAssignedUserId = us.UserId
JOIN [dbo].[uvStatus] as sta
ON iss.IssueStatusId = sta.StatusId