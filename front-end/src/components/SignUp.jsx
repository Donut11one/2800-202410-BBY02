import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fbconfig";
import { doc, setDoc } from "firebase/firestore";
import "./Button.css"; // Import button styles

const SignUp = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) { // Check if name is provided
      console.log("Input field empty");
      return;
    }
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Capture device and browser information
      const deviceInfo = {
        userAgent: navigator.userAgent,
        deviceType: getDeviceType(),
        browser: getBrowser(),
      };

      // Create a document reference with the UID as the document ID
      const userDocRef = doc(db, "users", user.uid);

      // Store user data in Firestore
      await setDoc(userDocRef, {
        name: name, // Set the user's name
        email: email,
        deviceInfo: deviceInfo,
      });

      console.log("Sign Up with:", user);

      onClose(); // Close the modal after successful sign up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
    }
  };

  // Function to get device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    return /Mobile/.test(userAgent) ? "Mobile" : "Desktop";
  };

  // Function to get browser
  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (/Edg\//.test(userAgent)) return "Microsoft Edge";
    if (/Chrome\//.test(userAgent)) return "Google Chrome";
    if (/Firefox\//.test(userAgent)) return "Mozilla Firefox";
    if (/Safari\//.test(userAgent)) return "Apple Safari";
    if (/OPR\//.test(userAgent)) return "Opera";
    return "Unknown Browser";
  };

  return (
    <div className="modal flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>Sign Up</h2>
        <form id="signup" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
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
            className="btn btn--outline block w-full py-2 mt-4 rounded-md focus:outline-none"
          >
            Sign Up
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

export default SignUp;