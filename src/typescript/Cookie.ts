export const setCookie = (name: string, value: string, lastsDays: number) => {
  const date = new Date();
  date.setTime(date.getTime() + lastsDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const updateCookie = (
  name: string,
  newValue: string,
  lastsDays: number
) => {
  deleteCookie(name);
  setCookie(name, newValue, lastsDays);
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};
