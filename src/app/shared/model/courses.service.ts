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

  findLessonsForCourse(courseUrl): Observable<Lesson[]> {

    let course$ = this.findCourseByUrl(courseUrl);

    let lessonsPerCourse$ = course$
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key));

    let courseLessons$ = lessonsPerCourse$
      .map(lspc => lspc.map(lesson => this.db.object('lessons/' + lesson.$key)))
      .flatMap(fbobs => Observable.combineLatest(fbobs));

    courseLessons$.subscribe();

    return Observable.of([]);
  }

}
