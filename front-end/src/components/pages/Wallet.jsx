import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../App.css";
import UploadDocModal from "../UploadDocModal";

const Wallet = () => {
  let { address } = useParams();
  const [walletAdd, setWalletAdd] = useState(address);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  let hiddenAddress =
    walletAdd.substring(0, 6) + "..." + walletAdd.substring(38);

  useEffect(() => {
    addWalletListener();
  });

  const history = useNavigate();

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log(accounts[0]);
          setWalletAdd(accounts[0]);
        } else {
          history("/home");
        }
      });
    } else {
      console.log("Please install Metamask");
    }
  };

  return (
    <>
      <Navbar buttonText={`Wallet Connected: ${hiddenAddress}`} />
      <div className="wallet">
        <h1>{`Connected: ${hiddenAddress}`}</h1>
        <button
          className="btn btn--large btn--primary"
          onClick={openUploadModal}
        >
          Upload document
        </button>
        {showUploadModal && <UploadDocModal onClose={closeUploadModal} />}

      </div>
      <Footer />
    </>
  );
};

export default Wallet;
