import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fbconfig";
import { Navigate } from "react-router-dom";

const Signup = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password) {
      console.log("input field empty");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (user) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div className="container">
      <h1>This is the Sign up page!!</h1>
      <form action="">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          id="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          id="password"
          placeholder="Password"
        />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
