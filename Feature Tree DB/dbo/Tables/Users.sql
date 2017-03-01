CREATE TABLE [dbo].[Users] (
    [UserId]        UNIQUEIDENTIFIER NOT NULL,
    [UserName]      NVARCHAR (50)    NOT NULL,
    [UserImagePath] VARCHAR (255)    NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);



