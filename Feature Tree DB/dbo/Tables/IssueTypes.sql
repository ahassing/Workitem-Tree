CREATE TABLE [dbo].[IssueTypes] (
    [TypeId]   INT           IDENTITY (1, 1) NOT NULL,
    [TypeName] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_IssueTypes] PRIMARY KEY CLUSTERED ([TypeId] ASC)
);

