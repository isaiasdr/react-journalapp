// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVlo2Wln6Cn1X2vnt4k-alIQpvMOLgx5c",
  authDomain: "react-app-cursos-e1d45.firebaseapp.com",
  projectId: "react-app-cursos-e1d45",
  storageBucket: "react-app-cursos-e1d45.appspot.com",
  messagingSenderId: "832221821332",
  appId: "1:832221821332:web:364bd4d55b9f46991bf781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}