import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBRlESZoRkLtjvICjeIXMqzqlQJbOZy50g",
  authDomain: "tfg-app-b932a.firebaseapp.com",
  projectId: "tfg-app-b932a",
  storageBucket: "tfg-app-b932a.appspot.com",
  messagingSenderId: "805419805781",
  appId: "1:805419805781:web:d80d5c657fa0b72469b8dc",
  measurementId: "G-62G9E0X17J",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUser = (user) => {
  const { displayName, email, uid } = user;

  return {
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithEmail = (email, pass) => {
  const user = firebase.auth().signInWithEmailAndPassword(email, pass);
  return user;
};

export const logout = async () => {
  return await firebase
    .auth()
    .signOut()
    .then(() => {
      return true;
    })
    .catch((e) => {
      return { message: e.message };
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
