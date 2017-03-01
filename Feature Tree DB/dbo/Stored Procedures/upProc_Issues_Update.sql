-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Issues_Update
	-- Add the parameters for the stored procedure here
	@IssueId int,
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

Update Issues
	Set IssueTitle = @IssueTitle,
		IssueDescription = @IssueDescription,
		IssueStatusId = @IssueStatusId,
		IssuePriorityId = @IssuePriorityId,
		IssueCreatorUserId = @IssueCreatorUserId,
		IssueAssignedUserId = @IssueAssignedUserId,
		IssueOwnerUserId = @IssueOwnerUserId,
		DependentOn  = @DependentOn,
		IssueProjectId = @IssueProjectId


	where IssueId = @IssueId


END