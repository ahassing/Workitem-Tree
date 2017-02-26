import { Injectable } from "@angular/core";

@Injectable()
export class ProjectListService {

    getProjects() {
        return PROJECTS;
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