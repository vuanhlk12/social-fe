import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtt6aiOwkeLwGMMhDSBf1YU6zw34f5AHY",
  authDomain: "social-img-17ab9.firebaseapp.com",
  projectId: "social-img-17ab9",
  storageBucket: "social-img-17ab9.appspot.com",
  messagingSenderId: "1087773553645",
  appId: "1:1087773553645:web:1906acc838d456c44d6de4",
  measurementId: "G-JS5V1B2RMZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
