import { CourseField } from "../components/CourseField";
import { firestore } from "../firebase/firebase";
import { Course } from "./Course";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "@firebase/firestore";
import { User } from "./User";
import { Role } from "./Role";

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

export const getUserData = async (id: string): Promise<User | undefined> => {
  try {
    const userDoc = await getDoc(doc(firestore, `logins/${id}`));

    if (userDoc.exists()) {
      const data = userDoc.data();
      const user = new User(
        data.fullName,
        data.username,
        data.password,
        data.email,
        data.phoneNumber,
        data.id,
        data.role as Role
      );

      return user;
    } else {
      console.log(`No such user with id: ${id}`);
      return undefined;
    }
  } catch (e) {
    console.error(`An error occurred: ${e}`);
    return undefined;
  }
};

export const uploadCourse = async (course: Course) => {
  const courseId = course.getId();

  try {
    if (await getDocs(collection(firestore, "courses/", courseId))) {
      return;
    }

    const courseDoc = doc(firestore, "courses/", courseId);

    await setDoc(courseDoc, {
      title: course.getTitle(),
      desc: course.getDesc(),
      img: course.getImg(),
      id: courseId,
    });
  } catch (e) {
    console.error(`An error occured: ${e}`);
  }
};

export const updateCourseData = async (
  course: Course,
  pathPart: string,
  value: string
) => {
  const path = `courses/${course.getId()}/`;

  try {
    const courseDoc = doc(firestore, path);
    const fieldUpdate = { [pathPart]: value };

    await updateDoc(courseDoc, fieldUpdate);
  } catch (e) {
    console.error(`An error occurred: ${e}`);
  }
};
