// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-890cb.firebaseapp.com",
  projectId: "mern-estate-890cb",
  storageBucket: "mern-estate-890cb.firebasestorage.app",
  messagingSenderId: "806076309467",
  appId: "1:806076309467:web:3b881e12a6f9b1d37551fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);