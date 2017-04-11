import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProjectModalService} from './project-modal.service';
import { Project } from '../projectlist/project';
import 'bootstrap';

@Component({

    selector: 'project-modal-component',
    template: require('./project-modal.component.html'),
    styles: [
        `.ng-valid[required] {
            border-left: 5px solid #5cb85c; /* green */
        }`,
        `.ng-invalid:not(.ng-untouched):not(form) {
            border-left: 5px solid #d9534f; /* red */
        }`,
        `.red-text {
            color: #d9534f !important; /* red */
        }`
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [ProjectModalService]
})
export class ProjectModalComponent  {


    modalTitle: string;

    @ViewChild('modal')
    modal: ModalComponent;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    model: Project = new Project();

    index: number = 0;
    backdropOptions = [true, false, 'static'];
    cssClass: string = '';

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    css: boolean = false;

    constructor(private router: Router, private modalService: ProjectModalService) { }




    save() {
        if (this.modalTitle == 'Edit Project') {
            // subscribes to the service that makes the update api call
            this.modalService.updateProject(this.model).subscribe();
        } else
        {
            this.modalService.createProject(this.model).subscribe();
        } 
        
    }
    dismissed() {
        this.output = '(dismissed)';
    }
   // loads the modal to create a project
    createProject() {
        this.modalTitle = 'Create Project'
        this.model = new Project();
        this.model.projectId = 0;
        this.open();
    }
    // loads the modal and edit data for the issueId passed in
    editProject(id: number) {
        this.modalService.getProject(id).subscribe(data => {
            this.model = data;
        });
        this.modalTitle = 'Edit Project';
        this.open();
    }
    // called to open the modal dialog
    open() {
        this.modal.open();
    }
}
