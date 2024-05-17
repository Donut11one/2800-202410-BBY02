import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ConnectWalletModal from "../ConnectWalletModal";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../../fbconfig";

const Home = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [userName, setUserName] = useState("");

  const history = useNavigate();

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    fetchUserName();
  }, []);//// Empty dependency array to run the effect only once when the component mounts

  const openWalletModal = () => setShowWalletModal(true);
  const closeWalletModal = () => setShowWalletModal(false);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
        history(`/wallet/${accounts[0]}`);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
          history(`/wallet/${accounts[0]}`);
        } else {
          console.log("Please connect your wallet.");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress("");
      console.log("Please install Metamask");
    }
  };

  const fetchUserName = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().name);
      });
    } catch (error) {
      console.error("Error fetching user's name:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home">
      {userName && userName.length > 0 && ( // Render welcome message if user's name is available
          <p>Welcome, {userName}!</p>
        )}
        <button
          className="btn btn--outline btn--large"
          onClick={openWalletModal}
        >
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`
            : "Connect Wallet"}
        </button>

        {showWalletModal && (
          <ConnectWalletModal
            onClose={closeWalletModal}
            onWalletConnect={connectWallet}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
