import React from "react";
import "./ConnectWalletModal.css";

const ConnectWalletModal = ({ onClose }) => {
  return (
    <div className="wallet-modal-overlay">
      <div className="wallet-modal">
        <p>Choose your favourite wallet!</p>
        <div className="wallet-modal-buttons">
          <button onClick={() => alert("Metamask!")}>Metamask</button>
          <button onClick={() => alert("Coinbase!")}>Coinbase</button>
          <button onClick={() => alert("Torus!")}>Torus</button>
          <button onClick={() => alert("WalletConnect!")}>WalletConnect</button>
          <button onClick={() => alert("Rabby!")}>Rabby</button>
        </div>
        <button className="wallet-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
