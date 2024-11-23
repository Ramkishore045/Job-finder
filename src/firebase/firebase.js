// Import the Firebase libraries you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD7NEsvLs5PvWdsYJsKFrOIjvSV1mq0I6E",
  authDomain: "job-search-140d4.firebaseapp.com",
  projectId: "job-search-140d4",
  storageBucket: "job-search-140d4.firebasestorage.app",
  messagingSenderId: "329238607270",
  appId: "1:329238607270:web:d51cd3d32e3abddd190b67",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export default app;
