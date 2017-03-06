﻿export class TreeNode {
    issueId: number;
    issueTitle: string;
    projectTitle: string;
    userName: string;
    issueDescription: string;
    priorityName: string;
    priorityImage: string;
    statusName: string;
    statusImage: string;
    typeName: string;
    typeImage: string;
    statusCatName: string;
    statusCatColor: string;
    userAvatarPath: string;
    dependentOn: number;
    children: TreeNode[];
    tempChildren: TreeNode[];
    x0: number;
    y0: number;
    x: number;
    y: number;
}