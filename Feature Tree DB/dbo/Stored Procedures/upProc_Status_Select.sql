-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--  EXEC upProc_Status_Select
--  EXEC upProc_Status_Select @statusId = 7
-- =============================================
CREATE PROCEDURE upProc_Status_Select 
	@statusId int = null


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * from Status
	WHERE ISNULL(@statusId, StatusId) = StatusId
END