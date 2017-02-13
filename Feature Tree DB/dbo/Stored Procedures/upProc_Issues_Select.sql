-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Issues_Select
	-- Add the parameters for the stored procedure here
	@IssueId int
AS
BEGIN


	select * from Issues where IssueId = @IssueId


END