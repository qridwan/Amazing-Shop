// import firebase from "firebase/app";
// import "firebase/auth";
import React, { useContext, useState} from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

// import firebaseConfig from "./firebase.config";
import "./Login.css";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initLoginFramework, signInWithEmailAndPassword } from "./LoginManager";

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

initLoginFramework()
function Login() {
  const [userInfo, setUserInfo] = useState({
    isSigned: false,
    name: "",
    email: "",
    photo: ""
  });
const [loggedIn, setLoggedIn] = useContext(UserContext)
let history = useHistory()
let location = useLocation() ;
let { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser] = useState(false);
  // const googleProvider = new firebase.auth.GoogleAuthProvider();
 
  // const handleGoogleSignIn = () => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(googleProvider)
  //     .then((res) => {
  //       const { displayName, email, photoURL } = res.user;
  //       const isSignedIn = {
  //         isSigned: true,
  //         name: displayName,
  //         email: email,
  //         photo: photoURL
  //       };
  //       setUserInfo(isSignedIn);
  //     });
  // };
  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUserInfo(res)
      setLoggedIn(res)
      history.replace(from);
    })
  }

  const FbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUserInfo(res)
      setLoggedIn(res)
      history.replace(from);
    })
  }

// const fbProvider = new firebase.auth.FacebookAuthProvider();
//   const handleFbSignIn = () => {
//     firebase
//       .auth()
//       .signInWithPopup(fbProvider)
//       .then((result) => {
//         const { displayName, email, photoURL } = result.user;
//         const isSignedIn = {
//           isSigned: true,
//           name: displayName,
//           email: email,
//           photo: photoURL
//         };
//         console.log(result);
//         setUserInfo(isSignedIn);
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log(error.message);
//       });
//   };

  // const handleSignOut = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       const signUserOut = { isSigned: false, name: "", email: "", photo: "" };
  //       setUserInfo(signUserOut);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let fieldValid = false;
    if (e.target.name === "email") {
      fieldValid = /\S+@\S+\.\S+/.test(e.target.value.toLowerCase());
      // console.log(fieldValid);
    }
    if (e.target.name === "password") {
      //script for min 8 letter password, with at least a symbol, upper and lower case letters and a number
      fieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        e.target.value
      );
      // console.log(fieldValid);
    }
    if (e.target.name === "name") {
      fieldValid = e.target.value;
    }

    if (fieldValid) {
      const newUserInfo = { ...userInfo };
      newUserInfo[e.target.name] = e.target.value;
      setUserInfo(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && userInfo.email && userInfo.password) {
      createUserWithEmailAndPassword(userInfo.name, userInfo.email, userInfo.password)
      .then(res => {
        setUserInfo(res)
        setLoggedIn(res)
        history.replace(from);
      })
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      //   .then((res) => {
      //     const newUserInfo = { ...userInfo };
      //     newUserInfo.error = "";
      //     newUserInfo.success = true;
      //     setUserInfo(newUserInfo);
      //     updateUserInfo(userInfo.name);
      //     // console.log(userInfo);
      //   })
      //   .catch((error) => {
      //     const newUserInfo = { ...userInfo };
      //     newUserInfo.error = error.message;
      //     newUserInfo.success = false;
      //     setUserInfo(newUserInfo);
      //     // console.log(userInfo);
      //   });
    }
    if (!newUser && userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        setUserInfo(res)
        setLoggedIn(res)
        history.replace(from);
      })
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      //   .then((res) => {
      //     const newUserInfo = { ...userInfo };
          
      //     console.log(userInfo.name);
      //     newUserInfo.error = "";
      //     newUserInfo.success = true;
      //     setUserInfo(newUserInfo);
      //     setLoggedIn(newUserInfo);
      //     history.replace(from);
      //     console.log(res.user);
      //   })
      //   .catch((error) => {
      //     const newUserInfo = { ...userInfo };
      //     newUserInfo.error = error.message;
      //     newUserInfo.success = false;
      //     setUserInfo(newUserInfo);
      //   });
    }
    e.preventDefault();
  };

  // const updateUserInfo = (name) => {
  //   const user = firebase.auth().currentUser;

  //   user
  //     .updateProfile({
  //       displayName: name
  //     })
  //     .then(function () {
  //       console.log("User name updated successfully!!!!!");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const getUserInfo = () => {
  //   const user = firebase.auth().currentUser;

  //   if (user != null) {
  //     user.providerData.forEach(function (profile) {
  //       console.log("Sign-in provider: " + profile.providerId);
  //       console.log("  Provider-specific UID: " + profile.uid);
  //       console.log("  Name: " + profile.displayName);
  //       console.log("  Email: " + profile.email);
  //       console.log("  Photo URL: " + profile.photoURL);
  //     });
  //   }
  // };
const SignOut =()=>{
  handleSignOut()
  .then(res => {
    setUserInfo(res)
    setLoggedIn(res)
  })
}
  return (
    <div className="Login">
      {/* google login */}
      {userInfo.isSigned === false ? (
        <button onClick={GoogleSignIn}>Sign In with GOOGLE-mama</button>
      ) : (
        <button onClick={SignOut}>Sign Out</button>
      )}
      <br />
      <br />

      {/* facebooklogin */}
      {userInfo.isSigned === false ? (
        <button onClick={FbSignIn}>Sign In with Facebook</button>
      ) : (
        <button onClick={SignOut}>Sign Out</button>
      )}

      {userInfo.isSigned && (
        <div>
          <p>Hello {userInfo.name}</p>
          <p>Your Email: {userInfo.email}</p>
          <img src={userInfo.photo} alt=""></img>
        </div>
      )}
      {userInfo.success && (
        <div>
          <h2>Hello {userInfo.name}</h2>
          <p>Your Email: {userInfo.email}</p>
          <img src={userInfo.photo} alt=""></img>
          <small>Pass Code : {userInfo.password}</small>
        </div>
      )}
      {!userInfo.isSigned && (
        <form>
          <>
            {" "}
            <input
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              label=""
            />
            <label htmlFor="newUser">New User Signup</label>
            <br />
            {newUser && (
              <input
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Your name"
              />
            )}
            <br />
            <br />
            <input
              onBlur={handleBlur}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <br />
            <br />
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Your Password"
            />
            <br />
            <br />
            {newUser ? (
              <input onClick={handleSubmit} type="submit" value="Sign Up" />
            ) : (
              <input onClick={handleSubmit} type="submit" value="Login" />
            )}
          </>
        </form>
      )}
      {userInfo.success && (
        <input onClick={handleSignOut} type="submit" value="Log Out" />
      )}
      <p>{userInfo.error}</p>
      {userInfo.success && (
        <p>{newUser ? "Signup" : "Logged in"} Succedded!!!</p>
      )}
    </div>
  );
}

export default Login;