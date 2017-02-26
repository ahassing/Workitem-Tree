import { Component, Input } from '@angular/core'

@Component({
    selector: 'project-thumbnail',
    template: require('./project-thumbnail.component.html')
})
export class ProjectThumbnailComponent {

    @Input() project:any
}