import {Component, OnInit, Input, Output} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {EventEmitter} from "events";

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  @Input()
  lessons: Lesson[];

  @Output('lesson')
  lessonEmitter = new EventEmitter<Lesson>();

  constructor() { }
  ngOnInit() { }

  selectLesson(lesson: Lesson) {
    this.lessonEmitter.emit(lesson);
  }
}
