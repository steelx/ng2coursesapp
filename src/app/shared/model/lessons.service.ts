import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import {Observable} from "rxjs";
import {Lesson} from "./lesson";

@Injectable()
export class LessonsService {

  constructor(private af: AngularFire) { }

  findAllLessons(): Observable<Lesson[]> {
    return this.af.database.list('lessons')
        .map(Lesson.fromJsonList);
  }

}
