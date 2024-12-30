// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD7NEsvLs5PvWdsYJsKFrOIjvSV1mq0I6E",
  authDomain: "job-search-140d4.firebaseapp.com",
  projectId: "job-search-140d4",
  storageBucket: "job-search-140d4.firebasestorage.app",
  messagingSenderId: "329238607270",
  appId: "1:329238607270:web:d51cd3d32e3abddd190b67",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app);

export { db, storage };






