import { Component, ViewChild } from '@angular/core';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [`
        #main { padding-left: 30px; 
                padding-right: 30px;
                }
    `] 
})
export class HomeComponent {

    //Add Child Component
    @ViewChild(ProjectModalComponent) modalChild: ProjectModalComponent;
}
