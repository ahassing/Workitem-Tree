-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
GO
