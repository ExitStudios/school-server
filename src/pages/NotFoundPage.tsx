import { Link } from "react-router-dom";
import "../css/NotFound.css";

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-heading">
        Error 404 <br />
        The Page You Are Trying To Access Was Not Found. Click The Following
        Link To Go Back To Login:
      </h2>
      <Link to={"/"} className="not-found-link">
        Back To Login
      </Link>
    </div>
  );
};
