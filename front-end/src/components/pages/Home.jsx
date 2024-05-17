import React, { useState } from "react";
import "../../App.css";
import "./Home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ConnectWalletModal from "../ConnectWalletModal";

const Home = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);

  const openWalletModal = () => setShowWalletModal(true);
  const closeWalletModal = () => setShowWalletModal(false);

  return (
    <>
      <Navbar />
      <div className="home">
        <button onClick={openWalletModal}>Connect Wallet</button>
        {showWalletModal && <ConnectWalletModal onClose={closeWalletModal} />}
      </div>
      <Footer />
    </>
  );
};

export default Home;
