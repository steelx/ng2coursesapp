import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
      .map(Course.fromJsonList);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    }).map(result => result[0]);
  }

  findLessonKeysForCourse(courseUrl): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key))
      .map(lspc => lspc.map(lesson => lesson.$key));
  }

  findLessonsForCourse(courseUrl): Observable<Lesson[]> {
    return this.findLessonKeysForCourse(courseUrl)
      .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
      .flatMap(fbobs => Observable.combineLatest(fbobs));
  }

}
