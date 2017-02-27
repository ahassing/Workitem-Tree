import { Injectable } from "@angular/core";
import { Project } from "./project";
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectListService {

    constructor(private http: Http) { }

    getProjects(): Observable<Project[]> {

        return this.http.get('api/project/')
            .map((response: Response) => <Project[]>response.json().catch(this.handleError))
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}

const PROJECTS = [
    {
        name: 'Proj1'
    },
    {
        name: 'BTVids'
    },
    {
        name: 'Feature Tree'
    }
]