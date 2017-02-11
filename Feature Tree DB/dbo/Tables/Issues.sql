CREATE TABLE [dbo].[Issues] (
    [IssueId]             INT              IDENTITY (1, 1) NOT NULL,
    [IssueTitle]          NVARCHAR (500)   NOT NULL,
    [IssueDescription]    NVARCHAR (MAX)   NOT NULL,
    [IssueStatusId]       INT              NOT NULL,
    [IssuePriorityId]     INT              NOT NULL,
    [IssueCreatorUserId]  UNIQUEIDENTIFIER NOT NULL,
    [IssueAssignedUserId] UNIQUEIDENTIFIER NOT NULL,
    [IssueOwnerUserId]    UNIQUEIDENTIFIER NOT NULL,
    [DateCreated]         DATETIME         NOT NULL,
    [DependentOn]         INT              NULL,
    CONSTRAINT [PK_Issues] PRIMARY KEY CLUSTERED ([IssueId] ASC),
    CONSTRAINT [FK_Issues_AssignedId] FOREIGN KEY ([IssueAssignedUserId]) REFERENCES [dbo].[Users] ([UserId]),
    CONSTRAINT [FK_Issues_CreatedId] FOREIGN KEY ([IssueCreatorUserId]) REFERENCES [dbo].[Users] ([UserId]),
    CONSTRAINT [FK_Issues_DependentIssue] FOREIGN KEY ([DependentOn]) REFERENCES [dbo].[Issues] ([IssueId]),
    CONSTRAINT [FK_Issues_OwnerId] FOREIGN KEY ([IssueOwnerUserId]) REFERENCES [dbo].[Users] ([UserId]),
    CONSTRAINT [FK_Issues_Priority] FOREIGN KEY ([IssuePriorityId]) REFERENCES [dbo].[Priority] ([PriorityId]),
    CONSTRAINT [FK_Issues_StatusId] FOREIGN KEY ([IssueStatusId]) REFERENCES [dbo].[Status] ([StatusId])
);

