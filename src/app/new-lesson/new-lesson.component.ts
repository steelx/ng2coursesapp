import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private lessonService: LessonsService) { }

  ngOnInit() {
    let courseId = this.route.snapshot.queryParams['courseId'];
    console.log(courseId);
  }

  save(form) {
    console.log(form);
  }

}
