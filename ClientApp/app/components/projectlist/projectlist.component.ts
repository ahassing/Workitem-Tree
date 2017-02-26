import { Component, OnInit } from '@angular/core';
import { ProjectListService } from './projectlist-service';
import { Project } from './project';

@Component({
    selector: 'projectlist',
    template: `
        <div class="row">
            <div *ngFor="let project of projects" class="col-md-4">
                    <project-thumbnail routerLink="/project/{{project.projectId}}" [project]="project"></project-thumbnail>
            </div>
        </div>
    `
})
export class ProjectListComponent implements OnInit{

    projects: Project[]

    constructor(private projectListService: ProjectListService) {}

    ngOnInit() {
        this.projectListService.getProjects().subscribe( data => {
            this.projects = data;
        });
    }

    handleProjectClick(projectName) {

    }

}