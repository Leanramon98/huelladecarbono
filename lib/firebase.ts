import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7WuTDBSncPTwFSs6onhhnUbBuijiJeng",
  authDomain: "huelladecarbono-a0190.firebaseapp.com",
  projectId: "huelladecarbono-a0190",
  storageBucket: "huelladecarbono-a0190.firebasestorage.app",
  messagingSenderId: "598192398595",
  appId: "1:598192398595:web:932fc8da2eac9e5afa4936"
};

// Initialize Firebase (SSR friendly)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
