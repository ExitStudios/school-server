import "../css/Courses.css";
import { CourseField } from "../components/CourseField";
import { Header } from "../components/Header";
import { Course } from "../typescript/Course";

export const CoursesPage = () => {
  const course = new Course(
    "Deutsch",
    "Ein Fach für jeden!",
    "https://www.gymnasium-beetzendorf.de/fotos/Schule2015.png"
  );

  return (
    <div className="Courses">
      <Header />

      <div className="courses-fields">
        <div className="course-field">
          <CourseField
            title={course.getTitle()}
            desc={course.getDesc()}
            img={course.getImg()}
            id={course.getId()}
          />
        </div>
        <div className="course-field">
          <CourseField
            title={course.getTitle()}
            desc={course.getDesc()}
            img={course.getImg()}
            id={course.getId()}
          />
        </div>
        <div className="course-field">
          <CourseField
            title={course.getTitle()}
            desc={course.getDesc()}
            img={course.getImg()}
            id={course.getId()}
          />
        </div>
      </div>
    </div>
  );
};
