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
      .map(results => Lesson.fromJson(results[0]));
  }

}
