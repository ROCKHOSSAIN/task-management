// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId,
  measurementId:import.meta.env.VITE_measurementId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBM74C-MtXB5wJTt2dMNbKOuNpJJteoosk",
//   authDomain: "task-management-4f52d.firebaseapp.com",
//   projectId: "task-management-4f52d",
//   storageBucket: "task-management-4f52d.appspot.com",
//   messagingSenderId: "484620156536",
//   appId: "1:484620156536:web:9f4a6302f9d54ddb0bb78d",
//   measurementId: "G-7NL6FPHJC1",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app