import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    let courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(courseUrl);
    //this.lessons$ = this.coursesService.findAllLessonsForCourse(courseUrl);
    this.lessons$ = this.coursesService.loadFirstLessonsPage(courseUrl, 3);
  }

}
