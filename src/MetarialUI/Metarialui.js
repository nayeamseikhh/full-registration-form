import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import AppleIcon from '@mui/icons-material/Apple';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';
import { ListItemText } from '@mui/material';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config'
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { useState } from 'react';
import {  FacebookAuthProvider, } from "firebase/auth";

initializeApp(firebaseConfig);
const auth = getAuth();

const Metarialui = () => {
    const [ user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      })
  

      const googleProvider = new GoogleAuthProvider();
      const fbProvider = new FacebookAuthProvider();
    
      const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(res => {
        const {displayName, email, photoURL} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser);
        console.log(displayName, email, photoURL)
      })
      .catch(error => {
        console.log(error);
        console.log(error.massage);
      })
      }
              // Fb popup sign in
              const handleFbSignIn  = () => {
                signInWithPopup(auth, fbProvider)
                .then(res => {
              const credential = FacebookAuthProvider.credentialFromResult(res);
             setUser(credential);
              console.log('fb succeessfully logged in', user)
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = FacebookAuthProvider.credentialFromError(error);
              console.log(error, errorCode, errorMessage, credential, email)
              // ...
            });
                }

      // const handleSignOut = () => {
      //   signOut(auth)
      //   .then(res => {
      //     const signedOutUser = {
      //       isSignedIn: false,
      //       name: '',
      //       email: '',
      //       photo: '',
      //     }
      //     setUser(signedOutUser);
      // })
      // .catch(error => {
      //   console.log(error);
      //   console.log(error.massage);
      // })
      // }
    
    return (
        <div>
        <ListItemText primary={<div style={{ margin: -25, marginTop: -7, color: 'white', fontSize: 11, minWidth: '50px', cursor: 'pointer',}}>
        <GoogleIcon onClick={handleSignIn}/> 
        <FacebookIcon onClick={handleFbSignIn} />  
        <LinkedInIcon/>
        <XIcon/>
        <AppleIcon/>
        <PinterestIcon/>
        <GitHubIcon/>
        <YouTubeIcon/>
        </div>} />
        </div>
    );
};

export default Metarialui;