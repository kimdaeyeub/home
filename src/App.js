import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { useForm } from "react-hook-form";
import { auth } from "./fbase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(error.message);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setLoggedInUser(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <>
      <AppRouter
        loggedInUser={loggedInUser}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default App;
