import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    let courseUrl = this.route.snapshot.params['id'];
    this.coursesService.findLessonsForCourse(courseUrl);
  }

}
