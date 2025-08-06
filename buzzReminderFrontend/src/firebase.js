import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-Z-jS6-FXznPqSWdy2WjcyB44hUaa3i8",
  authDomain: "buzzreminder-641f6.firebaseapp.com",
  projectId: "buzzreminder-641f6",
  storageBucket: "buzzreminder-641f6.appspot.com",
  messagingSenderId: "394638095714",
  appId: "1:394638095714:web:523bdc67a35d5a378ba83b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

