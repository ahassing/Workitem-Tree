import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

    public forecasts: Issue[]
    constructor(private http: Http) {
        
    }

    getIssue() {
        return this.http.get('api/issues').map(res => <Issue[]>res.json());

    }


}

interface Issue {
    IssueId: number;
    IssueTitle: string;
    IssueDescription: string;
    IssueStatusId: number;
    IssuePriorityId: number;
    IssueCreatorUserId: string;
    IssueAssignedUserId: string;
    IssueOwnerUserId: string;
    DateCreated: Date;
    DependentOn: number;
    IssueProjectId: number;
} 