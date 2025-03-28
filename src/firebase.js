import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUfgbnkRuMrZVeSScr5PY1af8K7pF5DnY",
  authDomain: "bingo-80874.firebaseapp.com",
  projectId: "bingo-80874",
  storageBucket: "bingo-80874.firebasestorage.app",
  messagingSenderId: "994568286927",
  appId: "1:994568286927:web:9d390490d0a10ccb303dba",
  measurementId: "G-EFWK5GSGTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Inicializa Firestore
const db = getFirestore(app);
export const auth = getAuth(app);


export { db };