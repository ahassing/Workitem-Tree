CREATE TABLE [dbo].[Priority] (
    [PriorityId]   INT           IDENTITY (1, 1) NOT NULL,
    [PriorityName] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED ([PriorityId] ASC)
);

