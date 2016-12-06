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
  lessons: Lesson[];
  courseUrl: string;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    // this.lessons$ = this.coursesService.findAllLessonsForCourse(courseUrl);
    let lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);

    lessons$.subscribe(lessons => this.lessons = lessons);
  }

  next() {
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    )
      .subscribe(lessons => this.lessons = lessons);
  }

  previous() {

  }

}
