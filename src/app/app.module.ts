import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2/index';
import {firebaseConfig} from '../environments/firebase.config';
import { HomeComponent } from './home/home.component';
import {LessonsService} from './shared/model/lessons.service';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { CoursesComponent } from './courses/courses.component';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import {CoursesService} from "./shared/model/courses.service";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { NewLessonComponent } from './new-lesson/new-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    CoursesComponent,
    TopMenuComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule
  ],
  providers: [LessonsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
