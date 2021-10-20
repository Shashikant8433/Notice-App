import firebase from "firebase/compat/app";

import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth, getAllNotices } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      history.push("/");
    });

    return unsubscribe;
  }, [history]);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email, password) {
    const loginDetails = await auth.signInWithEmailAndPassword(email, password);
    return loginDetails;
  }

  function logout() {
    window?.localStorage.clear();
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    getAllNotices,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
