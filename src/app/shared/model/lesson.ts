export class Lesson {
    constructor(
        public $key: string,
        public description: string,
        public duration: string,
        public url: string,
        public tags: string,
        public pro: string,
        public longDescription: string,
        public courseId: string
    ){}
}
