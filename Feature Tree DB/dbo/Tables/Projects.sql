CREATE TABLE [dbo].[Projects] (
    [ProjectId]    INT            IDENTITY (1, 1) NOT NULL,
    [ProjectTitle] NVARCHAR (500) NOT NULL,
    CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED ([ProjectId] ASC)
);

