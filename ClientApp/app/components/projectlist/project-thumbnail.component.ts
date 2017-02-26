﻿import { Component, Input } from '@angular/core'

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

    @Input() project:any
}