import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user);

  const [loading, setLoading] = useState(true);

  //cart
  const [cart, setCart] = useState([]);
  console.log(cart);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user observing");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (name, id) => {
    const obj = {
      name,
      id,
    };
    // setCart([...cart, obj]);
    localStorage.setItem("product", JSON.stringify([...cart, obj]));
    const data = localStorage.getItem("product");
    const item = JSON.parse(data);
    console.log(item);
    setCart(item);
  };

  const authInfo = {
    createUser,
    userLogin,
    googleLogin,
    logOut,
    updateUser,
    loading,
    user,
    addToCart,
    cart
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
