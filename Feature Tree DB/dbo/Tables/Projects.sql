CREATE TABLE [dbo].[Projects] (
    [ProjectId]    INT            IDENTITY (1, 1) NOT NULL,
    [ProjectTitle] NVARCHAR (500) NOT NULL,
    [ProjectDescription] VARCHAR(MAX) NULL, 
    CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED ([ProjectId] ASC)
);

