-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Projects_Update
	-- Add the parameters for the stored procedure here
	@ProjectId int,
	@ProjectTitle Nvarchar(500)
AS
BEGIN

Update Projects
	Set ProjectTitle = @ProjectTitle

	where ProjectId = @ProjectId


END