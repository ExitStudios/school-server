import React from "react";
import { Link } from "react-router-dom";

import { deleteCookie, getCookie } from "../Cookie";

import "../css/Dashboard.css";

export const DashboardPage = () => {
  window.addEventListener("close", () => {
    deleteCookie("loginData");
  });

  const replaceSpecialCharacters = (name: string) => {
    return name.replace(/ü/g, "ue").replace(/ä/g, "ae").replace(/ö/g, "oe");
  };

  const getUsername = (name: string | null) => {
    if (name)
      return replaceSpecialCharacters(name).toLowerCase().replace(/\s/g, "_");
    else return name;
  };

  return (
    <div className="Dashboard">
      <div className="header">
        <h3 className="logo">
          <Link to={"/"}>SchoolServer</Link>
        </h3>
        <nav className="nav-tabs">
          <Link to={"/courses"} className="tab">
            <i className="fas fa-book"></i> Kurse
          </Link>
          <Link
            to={`/profiles/${getUsername(getCookie("username"))}`}
            className="tab"
          >
            <i className="fas fa-book"></i> Profil
          </Link>
          <Link to={"/messages"} className="tab">
            <i className="fas fa-book"></i> Mitteilungen
          </Link>
          <Link to={"/settings"} className="tab">
            <i className="fas fa-book"></i> Eiinstellungen
          </Link>
        </nav>
      </div>

      <div className="main-dashboard">
        <div className="main-content">
          <h1 id="main-title">SchoolServer</h1>

          <div id="introduction">
            <div id="img">
              <img
                src="https://www.gymnasium-beetzendorf.de/fotos/Schule2015.png"
                id="title-img"
                draggable="false"
                loading="lazy"
              />
            </div>

            <span id="introduction-text">Herzlich willkommen!</span>
          </div>

          <div id="show-courses">
            <Link to={"/courses"} id="show-courses-btn">
              Zu meinen Kursen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
