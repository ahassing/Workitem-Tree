
CREATE VIEW uvStatus AS
SELECT st.*,
	   stcat.StatusCatName
FROM [dbo].[Status] as st
	JOIN StatusCategory as stcat
	ON st.StatusCatId = stcat.StatusCatId