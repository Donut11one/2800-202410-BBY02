import React from "react";
import "./ConnectWalletModal.css";

const ConnectWalletModal = ({ onClose, onWalletConnect }) => {
  return (
    <div className="wallet-modal-overlay">
      <div className="wallet-modal">
        <p>Choose your favourite wallet!</p>
        <div className="wallet-modal-buttons">
          <button onClick={onWalletConnect}>Metamask</button>
          <button onClick={() => alert("Coinbase coming soon!")}>
            Coinbase
          </button>
          <button onClick={() => alert("Torus coming soon!")}>Torus</button>
          <button onClick={() => alert("WalletConnect coming soon!")}>
            WalletConnect
          </button>
          <button onClick={() => alert("Rabby coming soon!")}>Rabby</button>
        </div>
        <button className="wallet-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
