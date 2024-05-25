import React from "react";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const addSpecialCharacters = (name: string) => {
    return name.replace(/ue/g, "ü").replace(/ae/g, "ä").replace(/oe/g, "ö");
  };

  const getDisplayName = (name: string | undefined) => {
    if (name)
      return addSpecialCharacters(
        name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    else return name;
  };

  const params = useParams<{ profile: string }>();

  return (
    <div>This Is The Profile Page Of {getDisplayName(params.profile)}.</div>
  );
};
