import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProjectModalService} from './project-modal.service';

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
export class ProjectModalComponent implements OnInit  {

    //statuses: Status[];
    //priorities: Priority[];
    //users: User[];
    //types: IssueType[];
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

    ngOnInit(): void {
        ////Initializes the select lists once for all node edits
        //this.modalService.getStatusSL().subscribe(data => {
        //    this.statuses = data;
        //});
        //this.modalService.getPrioritySL().subscribe(data => {
        //    this.priorities = data;
        //});
        //this.modalService.getUserSL().subscribe(data => {
        //    this.users = data;
        //});
        //this.modalService.getIssueTypeSL().subscribe(data => {
        //    this.types = data;
        //});
    }


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
        //this.modalTitle = null;
        //this.model = null;
    }
   // loads the modal to create a child node
    createChild(id: number ) {//, projectId: number) {
        this.modalTitle = 'Create Project'
        this.model = new Project();
        //this.model.dependentOn = id;
        //this.model.issueProjectId = projectId;
        //this.model.issueId = 0;
        this.open();
    }
    // loads the modal and edit data for the issueId passed in
    edit(id: number) {
        this.modalService.getProject(id).subscribe(data => {
            this.model = data;
        });
        this.modalTitle = 'Edit';
        this.open();
    }
    // called to open the modal dialog
    open() {
        this.modal.open();
    }
}

export class Project {
    projectId: number;
    projectTitle: string;
}