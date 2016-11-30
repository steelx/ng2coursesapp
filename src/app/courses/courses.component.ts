import { Component, OnInit } from '@angular/core';
import {Course} from "../shared/model/course";
import {CoursesService} from "../shared/model/courses.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private Courses: CoursesService) { }

  ngOnInit() {
    this.courses$ = this.Courses.findAllCourses();
  }

}
