// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3xx1Hf6FuwOXf30QKRtZjpv-d1DF72ho",
  authDomain: "media-socia.firebaseapp.com",
  projectId: "media-socia",
  storageBucket: "media-socia.appspot.com",
  messagingSenderId: "58410981071",
  appId: "1:58410981071:web:b4170e05d7a87b13ef09ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);