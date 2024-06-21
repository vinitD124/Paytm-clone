// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-5b230.firebaseapp.com",
  projectId: "mernauth-5b230",
  storageBucket: "mernauth-5b230.appspot.com",
  messagingSenderId: "757502975399",
  appId: "1:757502975399:web:da3f5425bed50131486a82",
  measurementId: "G-MJCVXZDN68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
