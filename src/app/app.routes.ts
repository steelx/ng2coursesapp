import { Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";

export const ROUTES: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
