-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- EXEC upProc_Priority_Select
-- EXEC upProc_Priority_Select @priorityId = 2
-- =============================================
CREATE PROCEDURE [dbo].[upProc_Priority_Select] 
	@priorityId int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM dbo.Priority
	WHERE ISNULL(@priorityId, PriorityId) = PriorityId

END