
import { useState } from 'react';
import './App.css';
import Metarialui from './MetarialUI/Metarialui';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";


function App() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success:false,
  })

  //email & passwords validation formula & stracture
  const handleChange = (e) => {
let isFieldValid = true;
if(e.target.name === 'email'){
  isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
}
if(e.target.name==='password'){
  const isPasswordValid = e.target.value.length > 6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFieldValid = isPasswordValid && passwordHasNumber;
}
if(isFieldValid){
  const newUserInfo = {...user};
  newUserInfo[e.target.name] = e.target.value;
  setUser(newUserInfo);
}
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      const auth = getAuth();
createUserWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
  // Signed up 
  const user = userCredential.user;
  const newUserInfo = {...user};
  newUserInfo.error = '';
  newUserInfo.success = true;
  setUser(newUserInfo);
  updateUserName(user.name);
  })
  //if get any error
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });
    }
    if(!newUser && user.email && user.password){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo)
    console.log('sign in user info', userCredential.user)
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });
    }
    e.preventDefault();
  }
  const updateUserName = name =>{
    const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        console.log('Profile name updated successfully')
      }).catch((error) => {
        // An error occurred
        console.log(error)
      });
  }
  return (
    <div>
      <div  className="container">
      <form action="" className='box' onSubmit={handleSubmit}>
        <h1>Sign up Form</h1>
        {newUser && <input type="text" name='name' onBlur={handleChange} placeholder='Your Name' />}
      <input type="text" name='email' onBlur={handleChange} placeholder='Email' required/><br />
      <input type="password" name='password' onBlur={handleChange} placeholder='Password' required/><br />
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'} /> <br />
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">If you new User Please Register</label><br />
      {/* <p className='text'>If you are a new user please <a href="n" onChange={() => setNewUser(!newUser)}>Sign Up</a></p> <br /> */}
      <Metarialui/>
      </form>
    </div>
    <p style={{color: 'red', textAlign: 'center', }}>{user.error}</p>
    {user.success && <p style={{color: 'green', textAlign: 'center', }}>User {newUser ?'Created' : 'Logged In'} succesfully</p>}
    </div>
  );
}

export default App;
