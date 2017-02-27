import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalService, Status, Priority, User } from './modal.service';

@Component({

    selector: 'modal-demo-component',
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
export class ModalTestComponent implements OnInit {

    statuses: Status[];
    priorities: Priority[];
    users: User[];

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


    closed() {
        this.output = '(closed) ' + this.selected;
    }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.output = '(opened)';
    }

    navigate() {
        this.router.navigateByUrl('/hello');
    }

    open() {
        this.modal.open();
       
    }
}

export class Issue {
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