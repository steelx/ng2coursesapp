import { Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";

export const ROUTES: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
