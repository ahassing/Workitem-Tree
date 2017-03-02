import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalService, Status, Priority, User } from './modal.service';

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
export class EditModalComponent implements OnInit  {

    statuses: Status[];
    priorities: Priority[];
    users: User[];
    editIssue: Issue = new Issue();

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

    ngOnInit() :void {
        this.modalService.getStatusSL().subscribe(data => {
            this.statuses = data;
        });
        this.modalService.getPrioritySL().subscribe(data => {
            this.priorities = data;
        });
        this.modalService.getUserSL().subscribe(data => {
            this.users = data;
        });
    }

    //ngAfterViewInit() {
    //    this.modalService.getStatusSL().subscribe(data => {
    //        this.statuses = data;
    //    });
    //    this.modalService.getPrioritySL().subscribe(data => {
    //        this.priorities = data;
    //    });
    //    this.modalService.getUserSL().subscribe(data => {
    //        this.users = data;
  
    //    });
      
    //}

    update() {
       // subscribes to the service that makes the update api call
        this.modalService.updateIssue(this.editIssue).subscribe();
    }
    dismissed() {
        this.output = '(dismissed)';
        this.editIssue = null;
    }
   
    //opened() {
    //    this.output = '(opened)';
    //}

    //navigate() {
    //    this.router.navigateByUrl('/hello');
    //}
    edit(id: number) {
        this.modalService.getIssue(id).subscribe(data => {
            this.editIssue = data;
        });
        this.open();
    }

    open() {
        //this.modalService.getStatusSL().subscribe(data => {
        //    this.statuses = data;
        //});
        //this.modalService.getPrioritySL().subscribe(data => {
        //    this.priorities = data;
        //});
        //this.modalService.getUserSL().subscribe(data => {
        //    this.users = data;
        //});
        this.modal.open();
    }
}

export class Issue {
    issueId: number;
    issueTitle: string;
    issueDescription: string;
    issueStatusId: number;
    issuePriorityId: number;
    issueCreatorUserId: string;
    issueAssignedUserId: string;
    issueOwnerUserId: string;
    dateCreated: Date;
    dependentOn: number;
    issueProjectId: number;
}