import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const initialiseFirebase = () =>{
     initializeApp(firebaseConfig);
}

export default initialiseFirebase;