export class Course {
  static fromJsonList(array): Course[] {
    return array.map(Course.fromJson);
  }
  static fromJson({$key, description, courseListIcon, iconUrl, longDescription, url}): Course {
    return new Course($key, description, courseListIcon, iconUrl, longDescription, url);
  }

  constructor(
    public $key: string,
    public description: string,
    public courseListIcon: string,
    public iconUrl: string,
    public longDescription: string,
    public url: string
  ){}

}
