-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- Exec upProc_Project_Select
-- Exec upProc_Project_Select @projectId = 1
-- =============================================
CREATE PROCEDURE [dbo].[upProc_Project_Select]
	-- Add the parameters for the stored procedure here
	@projectId int = null
AS
BEGIN


	select * from Projects
	where ISNULL(@projectId, ProjectId) = ProjectId


END