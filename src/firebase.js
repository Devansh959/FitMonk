import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC7z0kunAgEDGlZFgFQkH-GjR44Fu0Te2s",
  authDomain: "fitmonk-4bdc3.firebaseapp.com",
  projectId: "fitmonk-4bdc3",
  storageBucket: "fitmonk-4bdc3.appspot.com",
  messagingSenderId: "51246889038",
  appId: "1:51246889038:web:aa909fbcb76ab74591eb1f",
  measurementId: "G-L7KQ4MRLVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth};