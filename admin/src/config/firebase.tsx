
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA4Wnir8gsQOpSqtGATNC5X4yT0xhJFv3c",
  authDomain: "aiclub-event.firebaseapp.com",
  projectId: "aiclub-event",
  storageBucket: "aiclub-event.appspot.com",
  messagingSenderId: "511676017323",
  appId: "1:511676017323:web:8e2cfa5e975557e0e425ee",
  measurementId: "G-EDNBCZD8K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
