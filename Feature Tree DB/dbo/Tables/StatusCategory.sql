CREATE TABLE [dbo].[StatusCategory] (
    [StatusCatId]   INT           IDENTITY (1, 1) NOT NULL,
    [StatusCatName] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_StatusCategory] PRIMARY KEY CLUSTERED ([StatusCatId] ASC)
);

