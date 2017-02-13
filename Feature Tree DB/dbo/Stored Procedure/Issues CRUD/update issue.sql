-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
GO
