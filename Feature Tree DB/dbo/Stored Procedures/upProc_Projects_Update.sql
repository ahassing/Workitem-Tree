-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Projects_Update
	-- Add the parameters for the stored procedure here
	@ProjectId int,
	@ProjectTitle Nvarchar(500),
	@ProjectDescription varchar(Max)
AS
BEGIN

Update Projects
	Set ProjectTitle = @ProjectTitle,
		ProjectDescription = @ProjectDescription

	where ProjectId = @ProjectId


END