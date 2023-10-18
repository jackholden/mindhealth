/**
 * @file Auth Context and Provider file
 * @author Jack Holden
 */

import { useState, createContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../../firebase.config";
import useLocalAuth from "../../hooks/useLocalAuth";

/**
 * Create empty AuthContext
 */
export const AuthContext = createContext();

/**
 * The AuthProvider in charge of all things auth related
 * on a global scope. In the useEffect, we check Auth status
 * from Firebase SDK method which checks Async Storage before
 * assigning the value to the setUser state.
 *
 * It also includes all the functions required for Firebase auth
 * to work utilising the Firebase SDK.
 *
 * @param {*} children
 * @returns
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState([null, null, null, null]);
  const [success, setSuccess] = useState([null, null, null, null]);

  const { toggleAuth } = useLocalAuth();

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoaded(true);
        setError([null, null, null, null]);
        setSuccess([null, null, null, null]);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  /**
   * Custom error handler for error state in charge of
   * associating error message with correct array index.
   *
   * @param {*} message
   * @param {*} index
   */
  const handleError = (message, index) => {
    setError((prevError) => {
      const newError = [...prevError];
      newError[index] = message;
      return newError;
    });
  };

  /**
   * Custom success handler for success state in charge of
   * associating success message with correct array index.
   *
   * @param {*} message
   * @param {*} index
   */
  const handleSuccess = (message, index) => {
    setSuccess((prevSuccess) => {
      const newSuccess = [...prevSuccess];
      newSuccess[index] = message;
      return newSuccess;
    });
  };

  /**
   * handleSignIn extracts values data before calling
   * the Firebase signInWithEmailAndPassword method and
   * awaiting the response.
   *
   * @param {*} values
   */
  const handleSignIn = (values) => {
    const { emailData, password } = values;
    signInWithEmailAndPassword(auth, emailData, password)
      .then(() => {
        handleError(null, 0);
        console.log("Sign In Success");
      })
      .catch((e) => {
        handleError(e.message, 0);
        console.log(e.message);
      });
  };

  /**
   * handleSignup extracts values data before calling
   * the Firebase createUserWithEmailAndPassword method.
   *
   * Depending on the userCredential response, we update
   * the displayName value before resetting all error messages.
   *
   * @param {*} values
   */
  const handleSignup = async (values) => {
    const { email, password, displayName } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userCredential.userCredential;
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      handleSuccess("Success! Account Created.", 1);
      handleError(null, 1);
    } catch (e) {
      console.log(e.message);
      handleError(e.message, 1);
    }
  };

  /**
   * handleSignOut responsible for resetting the auth back
   * to its initial state. First disables local auth if enabled by
   * calling the useLocalAuth hook. We then reset the setError state
   * before calling Firebase signOut method.
   */
  const handleSignOut = () => {
    try {
      toggleAuth(false);
      setError([null, null, null, null]);
      setSuccess([null, null, null, null]);
      signOut(auth);
    } catch (e) {
      console.log("Error signing out: ", e);
    }
  };

  /**
   * handleForgottenPassword takes the email parameter
   * before calling the Firebase sendPasswordResetEmail method,
   * awaiting the result and assigning a success state message or
   * error state message.
   *
   * @param {*} email
   */
  const handleForgottenPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset Password Email sent");
        handleSuccess("Success! Check your inbox", 2);
        handleError(null, 2);
      })
      .catch((e) => {
        handleError(e.message, 2);
      });
  };

  /**
   * handleChangePassword extracts values current password & new password
   * before calling the Firebase signInWithEmailAndPassword method which will
   * confirm whether valid data entered and will reauthenticate the session
   * before calling the updatePassword method and awaiting response.
   *
   * @param {*} values
   */
  const handleChangePassword = (values) => {
    const { opassword, npassword } = values;

    signInWithEmailAndPassword(auth, auth.currentUser.email, opassword)
      .then(() => {
        updatePassword(auth.currentUser, npassword)
          .then(() => {
            handleSuccess("Success! Your password has been changed!", 3);
          })
          .catch((e) => {
            handleError(e.message, 3);
          });
      })
      .catch((e) => {
        handleError(e.message, 3);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loaded,
        user,
        handleSignIn,
        handleSignup,
        handleSignOut,
        handleForgottenPassword,
        handleChangePassword,
        error,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
