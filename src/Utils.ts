export const replaceSpecialCharacters = (name: string) => {
  return name.replace(/ü/g, "ue").replace(/ä/g, "ae").replace(/ö/g, "oe");
};

export const getUsername = (name: string) => {
  if (name)
    return replaceSpecialCharacters(name).toLowerCase().replace(/\s/g, "_");
  else return null;
};

export const addSpecialCharacters = (name: string | undefined) => {
  if (name)
    return name.replace(/ue/g, "ü").replace(/ae/g, "ä").replace(/oe/g, "ö");
  else return null;
};

export const getDisplayName = (name: string | undefined) => {
  if (name)
    return addSpecialCharacters(
      name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  else return null;
};

export const generateUniqueId = () => {
  return Math.random().toString().replace(".", "8");
};
