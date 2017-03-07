import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalService, Status, Priority, User, IssueType } from './modal.service';

@Component({

    selector: 'modal-component',
    template: require('./modal.component.html'),
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
    providers: [ModalService]
})
export class TreeModalComponent implements OnInit  {

    statuses: Status[];
    priorities: Priority[];
    users: User[];
    types: IssueType[];
    modalTitle: string;

    @ViewChild('modal')
    modal: ModalComponent;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    model: Issue = new Issue();

    index: number = 0;
    backdropOptions = [true, false, 'static'];
    cssClass: string = '';

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    css: boolean = false;

    constructor(private router: Router, private modalService: ModalService) { }

    ngOnInit(): void {
        //Initializes the select lists once for all node edits
        this.modalService.getStatusSL().subscribe(data => {
            this.statuses = data;
        });
        this.modalService.getPrioritySL().subscribe(data => {
            this.priorities = data;
        });
        this.modalService.getUserSL().subscribe(data => {
            this.users = data;
        });
        this.modalService.getIssueTypeSL().subscribe(data => {
            this.types = data;
        });
    }


    save() {
        if (this.modalTitle == 'Edit') {
            // subscribes to the service that makes the update api call
            this.modalService.updateIssue(this.model).subscribe();
        } else
        {
            this.modalService.createIssue(this.model).subscribe();
        } 
        
    }
    dismissed() {
        this.output = '(dismissed)';
        //this.modalTitle = null;
        //this.model = null;
    }
   // loads the modal to create a child node
    createChild(id: number, projectId: number) {
        this.modalTitle = 'Create Child'
        this.model = new Issue();
        this.model.dependentOn = id;
        this.model.issueProjectId = projectId;
        //this.model.issueId = 0;
        this.open();
    }
    // loads the modal and edit data for the issueId passed in
    edit(id: number) {
        this.modalService.getIssue(id).subscribe(data => {
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

export class Issue {
    issueId: number;
    issueTitle: string;
    issueDescription: string;
    issueType: number;
    issueStatusId: number;
    issuePriorityId: number;
    issueCreatorUserId: string;
    issueAssignedUserId: string;
    issueOwnerUserId: string;
    dateCreated: Date;
    dependentOn: number;
    issueProjectId: number;
}