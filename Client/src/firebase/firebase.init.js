// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "blog360-9503d.firebaseapp.com",
  projectId: "blog360-9503d",
  storageBucket: "blog360-9503d.appspot.com",
  messagingSenderId: "691805071573",
  appId: "1:691805071573:web:ad44533abfeeaf2e4d1a5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;