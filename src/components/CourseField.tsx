import React, { ReactElement } from "react";
import "../css/CourseField.css";
import { useNavigate } from "react-router-dom";

export interface CourseData {
  title: string;
  desc: string;
  img: string;
  linkTo: string;
}

export const CourseField = (courseData: CourseData) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(courseData.linkTo);
  };

  return (
    <div className="CourseField" onClick={handleClick}>
      <div className="content">
        <img src={courseData.img} className="img" />
        <div className="info">
          <h4 className="title">{courseData.title}</h4>
          <span className="desc">{courseData.desc}</span>
        </div>
      </div>
    </div>
  );
};
