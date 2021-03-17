import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const handleGoogleSignIn = () => {
   return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const isSignedIn = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        return isSignedIn;
      });
  };

  const fbProvider = new firebase.auth.FacebookAuthProvider();
 export const handleFbSignIn = () => {
   return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const isSignedIn = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        };
        console.log(result);
        return isSignedIn
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

 export const handleSignOut = () => {
  return  firebase
      .auth()
      .signOut()
      .then(() => {
        const signUserOut = { isSigned: false, name: "", email: "", photo: "" };
       return signUserOut;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const createUserWithEmailAndPassword = (email, password, name) => {
   return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserInfo(res.name);
      return newUserInfo
      // console.log(userInfo);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // console.log(userInfo);
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name
      })
      .then(function () {
        console.log("User name updated successfully!!!!!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };