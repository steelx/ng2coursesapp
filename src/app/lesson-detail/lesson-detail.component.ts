import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../shared/model/lesson";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lessonUrl: string;
  lesson: Lesson;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lessonsService: LessonsService) {}

  ngOnInit() {

    const lesson$ = this.route.params.switchMap(params => {
      let lessonUrl = params['id'];
      return this.lessonsService.findLessonByUrl(lessonUrl);
    });
    lesson$.subscribe(result => this.lesson = result);
  }

  next() {
    this.lessonsService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  previous() {
    this.lessonsService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(lesson => this.router.navigate(['lessons', lesson.url]));
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

}
