
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDWCjP876iMSo1OIsvUSOEtQGIrDj6YS8k",
  authDomain: "video-8c558.firebaseapp.com",
  projectId: "video-8c558",
  storageBucket: "video-8c558.appspot.com",
  messagingSenderId: "48469518938",
  appId: "1:48469518938:web:ef1c5e7feae42506d68663"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app