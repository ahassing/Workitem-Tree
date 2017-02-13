-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE upProc_Projects_Insert
	-- Add the parameters for the stored procedure here
	@ProjectId int,
	@ProjectTitle Nvarchar(500)
AS
BEGIN


	INSERT [dbo].[Projects] 
		(	[ProjectId], 
			[ProjectTitle]) 
			
	VALUES 
		(	@ProjectId, 
			@ProjectTitle)



END