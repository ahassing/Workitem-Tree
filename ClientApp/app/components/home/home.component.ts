import { Component } from '@angular/core';

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
}
