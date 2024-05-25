import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { collection, getDocs, DocumentData } from "@firebase/firestore";
import { firebase } from "../firebase/firebase";
import "../css/Login.css";
import { deleteCookie, setCookie } from "../Cookie";

interface LoginData {
  name: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginData[]>([]);
  const [error, setError] = useState<string>("");
  const dbRef = collection(firebase, "logins");
  const navigate = useNavigate();

  window.addEventListener("close", () => {
    deleteCookie("loginData");
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(dbRef);
        const fetchedData: LoginData[] = [];

        querySnapshot.forEach((doc: DocumentData) => {
          const data = doc.data() as LoginData;
          fetchedData.push(data);
        });

        setLoginData(fetchedData);
      } catch (e) {
        console.error(
          "An error occurred while trying to fetch data from the database",
          e
        );
      }
    };

    fetchData();
  }, [dbRef]);

  const handleLoginClick = () => {
    const user = loginData.find(
      (user) => user.name === username && user.password === password
    );

    if (user) {
      setError("");
      navigate("/dashboard");

      setCookie("username", username, 9999);
    } else {
      setError("Ungültiger Nutzername oder Passwort");
    }
  };

  return (
    <div className="Login">
      <div className="header">
        <h3 className="logo">
          <Link to={"/"}>SchoolServer</Link>
        </h3>
      </div>

      <div className="main">
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
        </div>

        <div className="login">
          <div className="login-field">
            {error && <div className="error-message">{error}</div>}
            <h2 id="login-title">Login</h2>

            <div className="inputs">
              <label htmlFor="username-input-field" id="username-label">
                Nutzername
              </label>
              <input
                type="text"
                id="username-input-field"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password-input-field" id="password-label">
                Kennwort
              </label>
              <input
                type="password"
                id="password-input-field"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-btn">
              <button id="login-btn" onClick={handleLoginClick}>
                Login
              </button>
            </div>

            <span id="forgot-password">
              <a href="#" id="forgot-password-link">
                Kennwort vergessen?
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
