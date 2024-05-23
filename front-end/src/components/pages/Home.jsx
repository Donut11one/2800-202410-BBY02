import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importing the necessary Firestore functions
import { db } from "../../fbconfig";
import "../../App.css";
import "./Home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../assets/images/stream-bg.jpeg";
import UploadDocModal from "../UploadDocModal";
import addWalletListener from "../../hooks/useWallet";
import useWallet from "../../hooks/useWallet";
import Profile from "./Profile";
import WalletSetupInstruction from "../WalletSetupInstruction";

const Home = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { walletAddress, connectWallet, getShortenedAddress } = useWallet();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const openProfileModal = () => setShowProfileModal(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchUserName(user.uid);
    } else {
      console.error("No user is signed in.");
    }
  });

  const fetchUserName = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserName(userDocSnap.data().name);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user's name:", error);
    }
  };

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  return (
    <>
      <Navbar ClickFn={openProfileModal} />
      {showProfileModal && <Profile />}
      <div className="home">
        {userName && <p className="welcome-message">Welcome, {userName}!</p>}
        {walletAddress && walletAddress.length > 0 ? (
          <button
            className="btn btn--large btn--primary"
            onClick={openUploadModal}
          >
            Upload document
          </button>
        ) : (
          <>
            <WalletSetupInstruction />
            <button
              className="btn btn--outline btn--large"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </>
        )}

        {/* <button
          className="btn btn--outline btn--large"
          onClick={connectWallet}
        >
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${getShortenedAddress(walletAddress)}`
            : "Connect Wallet"}
        </button>
        {walletAddress.length > 0 && (
          <button
            className="btn btn--large btn--primary"
            onClick={openUploadModal}
          >
            Upload document
          </button>
        )} */}
        {showUploadModal && <UploadDocModal onClose={closeUploadModal} />}
      </div>
      <Footer />
    </>
  );
};

export default Home;
