import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Issue } from './modal.component';

@Injectable()
export class ModalService {

    constructor(private http: Http) { }

    getStatusSL(): Observable<Status[]> {
        return this.http.get('api/status/')
            .map((response: Response) => <Status[]>response.json());
    }

    getPrioritySL(): Observable<Priority[]> {
        return this.http.get('api/priority/')
            .map((response: Response) => <Priority[]>response.json());
    }

    getUserSL(): Observable<User[]> {
        return this.http.get('api/user/')
            .map((response: Response) => <User[]>response.json());
    }

    getIssue(id: number): Observable<Issue> {
        return this.http.get('api/issue/' + id)
            .map((response: Response) => <Issue>response.json());
    }

    updateIssue(issue: Issue): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('api/issue/' + issue.issueId, JSON.stringify(issue), options);
            
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}


export class Status {
    statusId: number;
    statusName: string;
    statusCatId: number;
}

export class Priority {
    priorityId: number;
    priorityName: string;
}

export class User {
    userId: string;
    userName: string;
    userImagePath: string;
}