import React from "react";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../Cookie";

import "../css/Header.css";

export const Header = () => {
  window.addEventListener("close", () => {
    deleteCookie("loginData");
  });

  return (
    <div className="header">
      <h3 className="logo">
        <Link to={"/dashboard"}>SchoolServer</Link>
      </h3>
      <nav className="nav-tabs">
        <Link to={"/courses"} className="tab">
          <i className="fas fa-book"></i> Kurse
        </Link>
        <Link to={`/profiles/${getCookie("username")}`} className="tab">
          <i className="fas fa-head"></i> Profil
        </Link>
        <Link to={"/messages"} className="tab">
          <i className="fas fa-book"></i> Mitteilungen
        </Link>
        <Link to={"/settings"} className="tab">
          <i className="fas fa-book"></i> Eiinstellungen
        </Link>
      </nav>
    </div>
  );
};
