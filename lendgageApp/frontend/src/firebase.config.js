// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDznzkaG7vxDrepEhyyzJsWM5ZENrRVJUE",
  authDomain: "mobile-otp-6fd2e.firebaseapp.com",
  projectId: "mobile-otp-6fd2e",
  storageBucket: "mobile-otp-6fd2e.appspot.com",
  messagingSenderId: "951353643352",
  appId: "1:951353643352:web:b9d2f552b4e34633ab152d",
  measurementId: "G-VCWXR994DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);