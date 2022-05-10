// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

//Your web app's Firebase configuration
//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Get a reference to the storage service, which is used to create references in your storage bucket
const firebaseStorage = getStorage(firebaseApp);

setPersistence(firebaseAuth, browserSessionPersistence)
  .then(() => {})
  .catch((error) => {
    // Handle Errors here.
    console.error(error.code);
    console.error(error.message);
  });

export default firebaseApp;

export { firebaseAuth, firebaseStorage };
