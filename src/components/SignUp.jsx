import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fbconfig";
import { doc, setDoc } from "firebase/firestore";
import "../style.css"; // Import button styles

const SignUp = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameHint, setNameHint] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [passwordHint, setPasswordHint] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !name) { // Check if name is provided
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
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
      setError("Failed to sign up. Please try again.");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameHint("Name should be at least 3 characters long.");
    } else {
      setNameHint("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
      setEmailHint("Please enter a valid email address without special characters.");
    } else {
      setEmailHint("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordHint("Password should be at least 6 characters long.");
    } else if (!/[a-zA-Z]/.test(e.target.value)) {
      setPasswordHint("Password must contain at least one letter.");
    } else if (!/[0-9]/.test(e.target.value)) {
      setPasswordHint("Password must contain at least one number.");
    } else {
      setPasswordHint("");
    }
  };


  const handleClose = (e) => {
    if (e.target.id === 'SignUp-modal-close') onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" style={{ zIndex: 100 }} id="SignUp-modal-close" onClick={handleClose}>
      <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form id="signup" className="space-y-3" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            autoComplete="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
          />
          {nameHint && <p className="text-red-500 text-xs mt-1">{nameHint}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
          />
           {emailHint && <p className="text-red-500 text-xs mt-1">{emailHint}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
          />
           {passwordHint && <p className="text-red-500 text-xs mt-1">{passwordHint}</p>}
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