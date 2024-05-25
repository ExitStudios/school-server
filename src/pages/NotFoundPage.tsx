import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <h2>
        Error 404 <br />
        The Page You Are Trying To Access Was Not Found. Click The Following
        Link To Go Back:
      </h2>
      <Link to={"/"}>Back To Login Page</Link>
    </div>
  );
};
