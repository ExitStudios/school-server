import React from "react";
import "./css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="header">
        <h3 className="logo">
          <a href="index.html">SchoolServer</a>
        </h3>
        <nav className="nav-tabs">
          <a href="courses.html" className="tab">
            <i className="fas fa-book"></i> Kurse
          </a>
          <a href="profile.html" className="tab">
            <i className="fas fa-user"></i> Profil
          </a>
          <a href="profile.html" className="tab">
            <i className="fas fa-message"></i> Nachrichten
          </a>
          <a href="settings.html" className="tab">
            <i className="fas fa-cog"></i> Einstellungen
          </a>
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
            <button id="show-courses-btn" type="submit">
              Zu meinen Kursen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// https://youtu.be/oTIJunBa6MA?t=317
