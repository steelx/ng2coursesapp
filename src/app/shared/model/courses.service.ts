import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
import {Course} from "./course";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

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

  findLessonKeysForCourse(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .filter(course => !!course)// filters out random undefined data bug
      .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`, query))
      .map(lspc => lspc.map(lesson => lesson.$key));
  }

  findAllLessonsForCourse(courseUrl): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysForCourse(courseUrl));
  }

  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>): Observable<Lesson[]> {
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
      .flatMap(fbobs => Observable.combineLatest(fbobs));
  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {
    let firstPageLessonKeys$ = this.findLessonKeysForCourse(courseUrl, {
      query: {
        limitToFirst: pageSize
      }
    });

    return this.findLessonsForLessonKeys(firstPageLessonKeys$);
  }

  loadNextPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    let lessonKeys$ = this.findLessonKeysForCourse(courseUrl, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    });

    return this.findLessonsForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(1, lessons.length));
  }

}
