import { Component, Input, ViewChild} from '@angular/core';
import { Project } from './project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import 'bootstrap';



@Component({
    selector: 'project-thumbnail',
    template: require('./project-thumbnail.component.html'),
    styles: [`
    .thumbnail { height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .glyphicon-pencil { float: right; cursor: pointer; }
    `]
})
export class ProjectThumbnailComponent {

    @Input() project: Project
    @ViewChild(ProjectModalComponent) modalChild: ProjectModalComponent;

    editProject()
    {
    this.modalChild.editProject(this.project.projectId);
    }

    titleFormat(title: String, length: number) {
        if (title !== null) {
            if (title.length > length) {
                return title.substr(0, length) + "...";
            } else {
                return title;
            }
        } else {
            return title;
        }
    }
}