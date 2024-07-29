import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/CourseField.css";

interface CourseFieldProps {
  title: string;
  desc: string;
  img: string;
  id: string;
}

export const CourseField: React.FC<CourseFieldProps> = ({
  title,
  desc,
  img,
  id,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${id}`);
  };

  return (
    <div className="CourseField" onClick={handleClick}>
      <div className="content">
        <img src={img} className="img" />
        <div className="info">
          <h4 className="title">{title}</h4>
          <span className="desc">{desc}</span>
        </div>
      </div>
    </div>
  );
};
