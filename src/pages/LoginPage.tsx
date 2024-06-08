import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

import { deleteCookie, setCookie } from "../Cookie";
import { generateUniqueId, getUsername } from "../Utils";

import "../css/Login.css";

interface LoginData {
  fullName: string;
  password: string;
  id: string;
  uniqueId?: string;
}

export const LoginPage: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginData[]>([]);
  const [error, setError] = useState<string>("");
  const dbRef = collection(firestore, "logins");
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
          fetchedData.push({ ...data, id: doc.id });
        });

        setLoginData(fetchedData);
      } catch (e) {
        console.error(
          "An error occurred while trying to fetch data from the database: ",
          e
        );
      }
    };

    fetchData();
  }, [dbRef]);

  const handleLoginClick = async () => {
    const user = loginData.find(
      (u) => u.fullName === fullName && u.password === password
    );

    if (user) {
      setError("");

      try {
        if (!user.uniqueId) {
          const uniqueId = generateUniqueId();

          const userDoc = doc(firestore, "logins", user.id);
          await updateDoc(userDoc, { uniqueId });

          user.uniqueId = uniqueId;
        }

        setCookie("username", getUsername(fullName)!, 9999);
        setCookie("uniqueId", user.uniqueId, 9999);

        navigate("/dashboard");
      } catch (e) {
        console.error("Error updating user with unique ID: ", e);
        setError(
          "Ein Fehler ist während des Loginversuches aufgetreten. Bitte versuche es später erneut."
        );
      }
    } else {
      setError("Ungültiger Nutzername oder Passwort");
    }
  };

  return (
    <div className="Login">
      <div className="header">
        <h3 className="logo">
          <Link to={"/login"}>SchoolServer</Link>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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

            <button id="login-btn" onClick={handleLoginClick}>
              Login
            </button>

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
