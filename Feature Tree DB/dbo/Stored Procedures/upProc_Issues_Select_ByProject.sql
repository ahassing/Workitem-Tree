-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Issues_Select_ByProject
	-- Add the parameters for the stored procedure here
	@ProjectId int
AS
BEGIN


	select * from Issues where IssueProjectId = @ProjectId


END