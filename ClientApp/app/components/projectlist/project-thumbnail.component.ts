import { Component, Input } from '@angular/core';
import { Project } from './project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';



@Component({
    selector: 'project-thumbnail',
    template: require('./project-thumbnail.component.html'),
    styles: [`
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    `]
})
export class ProjectThumbnailComponent {

    @Input() project: Project
}