// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANeJgt_GTKX5JEWNKlFA3kYZcoRQ7LHLo",
  authDomain: "movie-slider-80f0b.firebaseapp.com",
  projectId: "movie-slider-80f0b",
  storageBucket: "movie-slider-80f0b.appspot.com",
  messagingSenderId: "789164216763",
  appId: "1:789164216763:web:60904a1951a350d0aef49e",
  measurementId: "G-7SLR95TVN8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
