import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection } from "@firebase/firestore";
import {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import { useAuth } from "./contexts/AuthContext";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

//firestore DB implementation
export const db = getFirestore();
export const usersCollectionRefrence = collection(db, "users");
export const noticeCollectionRefrence = collection(db, "notices");

export const createUser = async (user) => {
  console.log("create user called");
  if (!user?.role) {
    user.role = "user";
  }
  const docRef = await addDoc(usersCollectionRefrence, user);
  window?.localStorage.setItem("docId", docRef.id);
  return docRef.id;
};

export const getSingleUser = async (ID) => {
  const docRef = doc(db, "users", ID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("doc data", docSnap.data());
    return docSnap.data();
  } else {
    console.log("couldnot able to find :( ");
  }
};

export const getAllUsers = async () => {
  const data = await getDocs(usersCollectionRefrence);
  const allUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return allUsers;
};

export const getAllNotices = async () => {
  const data = await getDocs(noticeCollectionRefrence);
  const allNotices = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(allNotices);
  return allNotices;
};

export const isUserAvailable = async (email) => {
  const allUsers = await getAllUsers();
  const found = allUsers.find((obj) => obj.email === email);
  return found;
};

export const updateNotice = async (id, newDoc) => {
  const noticeDocPrev = doc(db, "notices", id);
  console.log(noticeDocPrev); //ref
  console.log(id); //id
  await updateDoc(noticeDocPrev, newDoc);
};

//firestore DB implementation ended

export const auth = app.auth();
export default app;
