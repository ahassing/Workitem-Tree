CREATE TABLE [dbo].[Status] (
    [StatusId]    INT           IDENTITY (1, 1) NOT NULL,
    [StatusName]  NVARCHAR (50) NOT NULL,
    [StatusCatId] INT           NOT NULL,
    [StatusImage] VARCHAR (50)  NULL,
    CONSTRAINT [PK_Status1] PRIMARY KEY CLUSTERED ([StatusId] ASC),
    CONSTRAINT [FK_Status_StatusCatId] FOREIGN KEY ([StatusCatId]) REFERENCES [dbo].[StatusCategory] ([StatusCatId])
);



