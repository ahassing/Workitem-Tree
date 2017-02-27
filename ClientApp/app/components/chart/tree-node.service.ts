import { Injectable } from "@angular/core";
import { TreeNode } from "./tree-node";
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TreeNodeService {

    constructor(private http: Http) { }

    getTreeNodes(id: number): Observable<TreeNode> {
        return this.http.get('api/tree/' + id)
            .map((response: Response) => <TreeNode>response.json());

    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}