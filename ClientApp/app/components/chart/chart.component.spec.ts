import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChartComponent } from './chart.component';
import { TreeModalComponent } from '../Modal/modal.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TreeNode } from './tree-node';
import { TREEDATA } from './mock-tree-nodes';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ChartComponent, TreeModalComponent, ModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});