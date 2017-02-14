-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[upProc_Issues_Insert]
	-- Add the parameters for the stored procedure here
	@IssueTitle Nvarchar(500),
	@IssueDescription  nvarchar(Max),
	@IssueStatusId int,
	@IssuePriorityId int,
	@IssueCreatorUserId uniqueidentifier,
	@IssueAssignedUserId uniqueidentifier,
	@IssueOwnerUserId uniqueidentifier,
	@DependentOn int,
	@IssueProjectId int
AS
BEGIN


	INSERT [dbo].[Issues] 
		( 
			[IssueTitle], 
			[IssueDescription], 
			[IssueStatusId], 
			[IssuePriorityId], 
			[IssueCreatorUserId], 
			[IssueAssignedUserId], 
			[IssueOwnerUserId], 
			[DateCreated], 
			[DependentOn],
			[IssueProjectId]) 
			
	VALUES 
		( 
			@IssueTitle, 
			@IssueDescription, 
			@IssueStatusId, 
			@IssuePriorityId, 
			@IssueCreatorUserId, 
			@IssueAssignedUserId, 
			@IssueOwnerUserId, 
			GetDate(), 
			@DependentOn,
			@IssueProjectId)



END