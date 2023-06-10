import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjxlux43OR9RIJ8NNPWXUzmfivszeal80",
  authDomain: "pwa-movil.firebaseapp.com",
  databaseURL: "https://pwa-movil-default-rtdb.firebaseio.com",
  projectId: "pwa-movil",
  storageBucket: "pwa-movil.appspot.com",
  messagingSenderId: "826515772760",
  appId: "1:826515772760:web:b9e198150f3d7a2045412d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{ auth }