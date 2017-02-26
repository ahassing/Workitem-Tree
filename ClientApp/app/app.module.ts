import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UniversalModule } from 'angular2-universal';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { ModalTestComponent } from './components/Modal/modal.component';
import { ProjectListComponent } from './components/projectlist/projectlist.component';
import { ProjectThumbnailComponent } from './components/projectlist/project-thumbnail.component';

import { ProjectListService } from './components/projectlist/projectlist-service';


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        ChartComponent,
        NavMenuComponent,
        HomeComponent,
        ProjectListComponent,
        ProjectThumbnailComponent,
        ModalTestComponent
    ],
    providers: [ProjectListService],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'project/:id', component: ChartComponent },
            { path: 'chart', component: ChartComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        Ng2Bs3ModalModule,
        FormsModule
    ]
})
export class AppModule {
}
