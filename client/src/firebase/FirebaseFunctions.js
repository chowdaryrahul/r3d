import React, { useContext } from "react";
import { firebaseAuth } from "./Firebase";
import { AuthContext } from "./Auth";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  console.log("Creating User");
  let { user } = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  await updateProfile(user, { displayName: displayName });
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = EmailAuthProvider.credential(email, oldPassword);
  await reauthenticateWithCredential(firebaseAuth.currentUser, credential);
  await updatePassword(firebaseAuth.currentUser, newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await signInWithEmailAndPassword(firebaseAuth, email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new FacebookAuthProvider();
  }
  await signInWithPopup(firebaseAuth, socialProvider);
}

async function doPasswordReset(email) {
  await sendPasswordResetEmail(firebaseAuth, email);
}

async function doPasswordUpdate(password) {
  await updatePassword(firebaseAuth.currentUser, password);
}

async function doSignOut() {
  console.log("Signed Out");
  await signOut(firebaseAuth);
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};
