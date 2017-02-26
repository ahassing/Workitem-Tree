import { Component, OnInit } from '@angular/core'
import { ProjectListService } from './projectlist-service'

@Component({
    selector: 'projectlist',
    template: `
        <div class="row">
            <div *ngFor="let project of projects" class="col-md-4">
                    <project-thumbnail [project]="project"></project-thumbnail>
            </div>
        </div>
    `
})
export class ProjectListComponent implements OnInit{

    projects: any[]

    constructor(private projectListService: ProjectListService) {

    }

    ngOnInit() {
        this.projects = this.projectListService.getProjects();
    }

    handleProjectClick(projectName) {

    }

}