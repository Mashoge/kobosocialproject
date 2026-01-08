import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// your firebase con
const firebaseConfig = {
  apiKey: "AIzaSyCQo9765CTLDuqizsQs6Ai_n3OgWwiPhXc",
  authDomain: "kobodatabase-backend.firebaseapp.com",
  projectId: "kobodatabase-backend",
  storageBucket: "kobodatabase-backend.appspot.com",
  messagingSenderId: "282419994086",
  appId: "1:282419994086:web:db9a90c22bbb646df88a27",
  measurementId: "G-FFS2SJBL6L",
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
