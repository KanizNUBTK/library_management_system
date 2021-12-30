import { useEffect, useState } from "react";
import initialiseFirebase from "../component/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut ,onAuthStateChanged } from "firebase/auth";


initialiseFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsloading] = useState(true);
    const [admin,setAdmin]=useState(false);

    const auth = getAuth();

    //registartion
    const registerUser = (email,password,name,locaction,navigate)=>{
        console.log(name);
        setIsloading(true);
        const destination = locaction?.state?.from || '/' ;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = {email, displayName:name};
                setUser(newUser);
                savedUser(email,name);
                navigate(destination);
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {})
                  .catch((error) => {});
            })
            .catch((error) => {
                setAuthError(error.message);
        })
        .finally(()=>setIsloading(false));
    }

    //login
    const loginUser =(email, password, locaction,navigate)=>{
        setIsloading(true);
        const destination = locaction?.state?.from || '/' ;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
        })
        .finally(()=>setIsloading(false));
    }

    //handle user
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
              setUser({});
            }
            setIsloading(false);
          });
          return ()=> unSubscribe;
    },[auth])
    //make admin
    console.log(user.email);
    useEffect(()=>{
        const url=`http://localhost:5000/users/${user.email}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log('check admin', data);
            setAdmin(data.admin);
        })
    },[user,admin]);
    console.log(admin);
    //logout
    const logout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    //saved user in database
    const savedUser = (email,displayName)=>{
        const user={email,displayName};
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(user)
        })
        .then()
    }

    return {
        user,
        admin,
        authError,
        isLoading,
        registerUser,
        loginUser,
        logout
    }
}

export default useFirebase;