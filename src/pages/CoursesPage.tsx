import React from "react";
import { Link } from "react-router-dom";
import "../css/Courses.css";
import { deleteCookie, getCookie } from "../Cookie";
import { CourseData, CourseField } from "../components/CourseField";
import { Header } from "../components/Header";

export const CoursesPage = () => {
  window.addEventListener("close", () => {
    deleteCookie("username");
  });

  const courseData: CourseData = {
    title: "MyCourse",
    desc: "Cool",
    img: "https://www.gymnasium-beetzendorf.de/fotos/Schule2015.png",
    linkTo: "/dashboard",
  };

  return (
    <div className="Courses">
      <Header />

      <div className="courses-fields">
        <div className="course-field">
          <CourseField {...courseData} />
        </div>
        <div className="course-field">
          <CourseField {...courseData} />
        </div>
        <div className="course-field">
          <CourseField {...courseData} />
        </div>
      </div>
    </div>
  );
};
