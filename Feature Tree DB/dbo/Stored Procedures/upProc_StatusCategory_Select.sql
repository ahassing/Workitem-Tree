-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- EXEC upProc_StatusCategory_Select
-- EXEC upProc_StatusCategory_Select @StatusCatId = 2
-- =============================================
CREATE PROCEDURE [dbo].[upProc_StatusCategory_Select] 
	@StatusCatId int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM dbo.StatusCategory
	WHERE ISNULL(@StatusCatId, StatusCatId) = StatusCatId
END