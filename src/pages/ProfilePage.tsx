import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { firestore } from "../firebase/firebase";
import { Header } from "../components/Header";
import { updateCookie } from "../typescript/Cookie";
import { User } from "../typescript/User";

import "../css/Profile.css";
import { Role } from "../typescript/Role";

export const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [newName, setNewName] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams<{ profile: string }>();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(firestore, `logins/${params.profile}`);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const user = new User(
            data.name,
            data.username,
            data.password,
            data.email,
            data.phoneNumber,
            userDocSnap.id,
            data.role as Role
          );

          setUserData(user);
          setNewName(user.getName());
          setNewFullName(user.getUsername());
          setNewEmail(user.getEmail());
          setNewPhoneNumber(user.getPhoneNumber());
          setPassword(user.getPassword());
        } else {
          console.log("User Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [params.profile]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const userDocRef = doc(firestore, `logins/${params.profile}`);
      const newUserDocRef = doc(firestore, `logins/${newName}`);
      const existingUserSnapshot = await getDoc(newUserDocRef);

      if (password === "") {
        setError("Du musst ein Passwort haben");
        return;
      }

      if (existingUserSnapshot.exists() && params.profile !== newName) {
        setError("Dieser Benutzername ist bereits vergeben");
        return;
      }

      const updatedUser = new User(
        newName,
        newFullName,
        password,
        newEmail,
        newPhoneNumber,
        params.profile!,
        userData!.getRole()
      );

      await updateDoc(userDocRef, {
        name: updatedUser.getName(),
        fullName: updatedUser.getUsername(),
        email: updatedUser.getEmail(),
        phoneNumber: updatedUser.getPhoneNumber(),
        password: updatedUser.getPassword(),
      });

      if (params.profile !== newName) {
        await setDoc(newUserDocRef, {
          name: updatedUser.getName(),
          fullName: updatedUser.getUsername(),
          email: updatedUser.getEmail(),
          phoneNumber: updatedUser.getPhoneNumber(),
          password: updatedUser.getPassword(),
          role: updatedUser.getRole(),
        });

        await deleteDoc(userDocRef);
      }

      updateCookie("username", newName, 9999);

      navigate(`/dashboard`);

      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="ProfilePage">
      <Header />

      <div className="profile-form">
        <h2>Profil</h2>
        {error && <span className="error-message-profile">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Benutzername:</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Vollständiger Name:</label>
          <input
            type="text"
            id="fullName"
            value={newFullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefonnummer:</label>
          <input
            type="tel"
            id="phone"
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Speichern
        </button>
      </div>
    </div>
  );
};
