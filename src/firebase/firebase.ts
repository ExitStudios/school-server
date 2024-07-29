import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP-bwfucimEkDeoQE26URh4ErbXqRVTNw",
  authDomain: "school-ser.firebaseapp.com",
  projectId: "school-ser",
  storageBucket: "school-ser.appspot.com",
  messagingSenderId: "665221627317",
  appId: "1:665221627317:web:588eb3d073b2417cc1adfc",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
