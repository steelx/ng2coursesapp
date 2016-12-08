export class Lesson {
  static fromJsonList(array): Lesson[] {
    return array.map(Lesson.fromJson);
  }
  static fromJson({$key, description, duration, url, tags, pro, longDescription, courseId, videoUrl}): Lesson {
    return new Lesson($key, description, duration, url, tags, pro, longDescription, courseId, videoUrl);
  }

  constructor(
    public $key: string,
    public description: string,
    public duration: string,
    public url: string,
    public tags: string,
    public pro: string,
    public longDescription: string,
    public courseId: string,
    public videoUrl: string
  ){}

  get isBeginner() {
    return this.tags && this.tags.includes('BEGINNER');
  }
}
