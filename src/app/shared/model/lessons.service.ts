import {Injectable, Inject} from "@angular/core";
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Observable, Subject} from "rxjs";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class LessonsService {
  private fbSdkDb;

  constructor(private database: AngularFireDatabase, @Inject(FirebaseRef) fbRef) {
    this.fbSdkDb = fbRef.database().ref();
  }

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

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const newLessonToSave = Object.assign({}, lesson, {courseId});
    const newLessonKey = this.fbSdkDb.child('lessons').push().key;

    let dataToSave = {};
    dataToSave[`lessons/${newLessonKey}`] = newLessonToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(data) {
    const subject = new Subject();

    this.fbSdkDb.update(data)
      .then(
        success => {
          subject.next(success);
          subject.complete();
        },
        error => {
          subject.error(error);
          subject.complete();
        }
      );

    return subject.asObservable();
  }

}
