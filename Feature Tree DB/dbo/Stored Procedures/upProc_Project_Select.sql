-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Project_Select
	-- Add the parameters for the stored procedure here
	@ProjectId int
AS
BEGIN


	select * from Projects where ProjectId = @ProjectId


END