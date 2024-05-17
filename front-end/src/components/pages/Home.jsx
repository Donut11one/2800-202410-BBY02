import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ConnectWalletModal from "../ConnectWalletModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const history = useNavigate();

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });

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

  return (
    <>
      <Navbar />
      <div className="home">
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
