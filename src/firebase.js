// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj3ucgqZV0uZ6p3UZNtRaDaHdtb5MMCLo",
  authDomain: "project-8512608479492479363.firebaseapp.com",
  projectId: "project-8512608479492479363",
  storageBucket: "project-8512608479492479363.firebasestorage.app",
  messagingSenderId: "263311207968",
  appId: "1:263311207968:web:6b023169b77fed92251645",
  measurementId: "G-347H4XNV7Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

