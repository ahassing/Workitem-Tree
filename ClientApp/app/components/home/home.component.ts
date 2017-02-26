import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [`
        #main { padding-left: 50px; 
                padding-right: 50px;
                }
    `] 
})
export class HomeComponent {
}
