import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {
  courseId: string;
  constructor(private route: ActivatedRoute, private lessonService: LessonsService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
    console.log('courseId : ', this.courseId);
  }

  save(form) {
    this.lessonService.createNewLesson(this.courseId, form.value)
      .subscribe(
        success => {
          alert('New lesson saved successfully');
          form.reset();
        },
        error => alert(`Error creating new Lesson ${error}`)
      );
  }

}
