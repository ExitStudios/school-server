import { generateUniqueId } from "./Utils";

export class Course {
  private title: string;
  private desc: string;
  private img: string;
  private id: string;

  constructor(title: string, desc: string, img: string, id?: string) {
    this.title = title;
    this.desc = desc;
    this.img = img;

    if (id) this.id = id;
    else this.id = generateUniqueId();
  }

  getTitle() {
    return this.title;
  }

  getDesc() {
    return this.desc;
  }

  getImg() {
    return this.img;
  }

  getId() {
    return this.id;
  }

  getLink() {
    return `courses/${this.id}`;
  }
}
