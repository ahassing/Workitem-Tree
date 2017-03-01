-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[upProc_Projects_Insert]
	-- Add the parameters for the stored procedure here
	@ProjectTitle Nvarchar(500)
AS
BEGIN


	INSERT [dbo].[Projects] 
		( 
			[ProjectTitle]) 
			
	VALUES 
		( 
			@ProjectTitle)



END