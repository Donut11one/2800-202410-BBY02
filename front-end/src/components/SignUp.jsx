import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbconfig";

const SignUp = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Input field empty");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign Up with:", user);
        onClose(); // Close the modal after successful sign up
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
      });
  };

  return (
    <div className="modal flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form id="signup" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="block w-full bg-green-400 hover:bg-green-500 text-white py-2 mt-4 rounded-md focus:outline-none focus:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="block w-full bg-gray-200 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUp;