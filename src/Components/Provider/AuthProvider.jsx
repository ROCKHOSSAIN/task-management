import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const provider = new GoogleAuthProvider();
    const provider2 = new GithubAuthProvider();
    const auth = getAuth(app);
    const createUser = (email, password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () => {
        setloading(true);
        return signOut(auth)
    }
    const googleSignIn = () => {
        setloading(true)
        return signInWithPopup(auth, provider)
    }
    const GitHubSignIn = () => {
        setloading(true)
        return signInWithPopup(auth, provider2)
    }
    // const updateUserProfile = (name, photo) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: photo
    //     })
    // }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current value of the current user',currentUser)
            setloading(false)
        })
        return()=>{
            unsubscribe();
        }
    },[])
    const userinfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        GitHubSignIn
        // updateUserProfile
    }
    return (
      <AuthContext.Provider value={userinfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;