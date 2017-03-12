import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Project } from '../projectlist/project';

@Injectable()
export class ProjectModalService {

    constructor(private http: Http) { }

    getProject(id: number): Observable<Project> {
        return this.http.get('api/project/' + id)
            .map((response: Response) => <Project>response.json());
    }

    updateProject(project: Project): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('api/project/' + project.projectId, JSON.stringify(project), options);
            
    }

    createProject(project: Project): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('api/project/', JSON.stringify(project), options);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}

