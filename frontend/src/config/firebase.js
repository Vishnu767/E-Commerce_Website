// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkT5XmFkj5ZWE86iCaRodr6HB7tJxMqtM",
  authDomain: "goshop-46575.firebaseapp.com",
  projectId: "goshop-46575",
  storageBucket: "goshop-46575.appspot.com",
  messagingSenderId: "856083174364",
  appId: "1:856083174364:web:1696d38b04188bcc0f7519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();