import "../css/Courses.css";
import { CourseField } from "../components/CourseField";
import { Header } from "../components/Header";
import { Course } from "../typescript/Course";
import { getCourseData } from "../typescript/Utils";
import { useEffect, useState } from "react";

export const CoursesPage = () => {
  const [course, setCourse] = useState<Course>(
    new Course(
      "COURSE_NOT_FOUND",
      "The course you are trying to find was not found or is still loading",
      "",
      ""
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      setCourse((await getCourseData("084305367614981528")) as Course);
    };

    fetchData();
  });

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
