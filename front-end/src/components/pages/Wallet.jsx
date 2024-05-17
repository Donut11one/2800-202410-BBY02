import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../App.css";

const Wallet = () => {
  let { address } = useParams();
  const [walletAdd, setWalletAdd] = useState(address);
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
        <button className="btn btn--large btn--primary">Upload document</button>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
