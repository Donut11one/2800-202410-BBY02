import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbconfig";
import { Navigate } from "react-router-dom";
import "./Button.css"; // Import button styles

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // State to track user authentication

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Input field empty");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login with:", user);
        setUser(user); // Set the authenticated user
        onClose(); // Close the modal after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
      });
  };

  // Redirect if user is authenticated
  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="modal flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>Login</h2>
        <form id="login" onSubmit={handleLogin}>
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
            autoComplete="current-password"
            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="btn btn--primary block w-full py-2 mt-4 rounded-md focus:outline-none"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="btn btn--outline block w-full py-2 mt-4 rounded-md focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;