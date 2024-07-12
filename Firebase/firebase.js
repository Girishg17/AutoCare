import { initializeApp } from '@firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDWUJCm_kPrzJ3oGYpcanihn93l1IS4R9w",
  authDomain: "auto-care-38ec4.firebaseapp.com",
  projectId: "auto-care-38ec4",
  storageBucket: "auto-care-38ec4.appspot.com",
  messagingSenderId: "571784995660",
  appId: "1:571784995660:web:69324b27beba6dab9925e9",
  measurementId: "G-X0NSHYLLCE"
};

const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp;