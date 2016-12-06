import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
              private lessonsService: LessonsService) {}

  ngOnInit() {
    this.lessonUrl = this.route.snapshot.params['id'];
    const lesson$ = this.lessonsService.findLessonByUrl(this.lessonUrl);
    lesson$.subscribe(result => this.lesson = result);
  }

}
