import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
 
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
 
 
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const googleProvider = new GoogleAuthProvider()
 
  const handleResister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
 
  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin =()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const manageProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
        
      });
      
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSignOut = ()=>{
    setLoading(true);
    return signOut(auth)
 
 }
 useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => {
        unSubscribe();
    };
}, []);


  const authInfo = {
    theme,
    setTheme,
    loading,
    handleResister,
    handleSignIn,
    user,
    setUser,
    error,
    setError,
    email,
    setEmail,
    resetEmail,
    setResetEmail,
    handleGoogleLogin,
    manageProfile,
    handleSignOut
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
