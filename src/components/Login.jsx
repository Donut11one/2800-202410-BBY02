import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fbconfig";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import "../style.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Capture device and browser information
        const deviceInfo = {
          userAgent: navigator.userAgent,
          deviceType: getDeviceType(),
          browser: getBrowser(),
        };

        // Get user document reference
        const userDocRef = doc(db, "users", user.uid);

        // Check if user document exists in Firestore
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          // Update user information with new device and browser information
          await updateDoc(userDocRef, {
            deviceInfo: deviceInfo,
          });
        } else {
          console.log("User document does not exist in Firestore");
        }

        console.log("Login with:", user);
        setUser(user); // Set the authenticated user
        onClose(); // Close the modal after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
        setError("Invalid email or password.");
      });
  };

  const history = useNavigate();

  const handleReset = () => {
    history("/reset");
  };

  // Redirect if user is authenticated
  if (user) {
    return <Navigate to="/home" />;
  }

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

  const handleClose = (e) => {
    if (e.target.id === 'login-modal-close') onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" style={{ zIndex: 100 }} id="login-modal-close" onClick={handleClose}>
      <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form id="login" className="space-y-3 flex flex-col" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-2.5"
          />
          <button
            type="submit"
            className="btn btn--outline bg-transparent block w-full py-2 mt-4 rounded-md focus:outline-none"
          >
            Login
          </button>
          <button
            type="button" onClick={handleReset}
            className="btn btn--outline block w-full py-2 mt-4 rounded-md focus:outline-none"
          >
            Forgot Password?
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

