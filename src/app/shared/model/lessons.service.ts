import { Injectable } from "@angular/core";
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class LessonsService {

  constructor(private database: AngularFireDatabase) { }

  findAllLessons(query: FirebaseListFactoryOpts = {}): Observable<Lesson[]> {
    return this.database.list('lessons', query)
        .map(Lesson.fromJsonList);
  }

  findLessonByUrl(lessonUrl: string): Observable<Lesson> {
    return this.findAllLessons({
      query: {
        orderByChild: 'url',
        equalTo: lessonUrl
      }
    })
      .filter(lessons => lessons && lessons.length > 0)// Hot fix for undefined $key
      .map(lessons => Lesson.fromJson(lessons[0]));
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.database.list(`lessonsPerCourse/${courseId}`, {
      query : {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .filter(lessons => lessons && lessons.length > 0)
      .map(lessons => lessons[1].$key)
      .switchMap(lessonKey => this.database.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.database.list(`lessonsPerCourse/${courseId}`, {
      query : {
        orderByKey: true,
        endAt: lessonId,
        limitToLast: 2
      }
    })
      .filter(lessons => lessons && lessons.length > 0)
      .map(lessons => lessons[0].$key)
      .switchMap(lessonKey => this.database.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }

}
