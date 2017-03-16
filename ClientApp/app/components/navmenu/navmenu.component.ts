import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm {display:none}}
        #navigationbar { padding-left: 10px; padding-right: 10px; background-color: #13a9e1; }
    `]
})
export class NavMenuComponent {
}
