-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- EXEC upProc_Issues_Select
-- EXEC upProc_Issues_Select @IssueId = 1
-- =============================================
CREATE PROCEDURE [dbo].[upProc_Issues_Select]
	-- Add the parameters for the stored procedure here
	@IssueId int = null
AS
BEGIN


	SELECT * FROM Issues
	WHERE IssueId = ISNULL(@IssueId, IssueId)


END