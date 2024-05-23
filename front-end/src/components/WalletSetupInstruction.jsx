import React from "react";
import "../style.css";

const WalletSetupInstruction = () => {
  return (
    <>
    <p className="instruction-header">Please install and create a wallet in metamask. See instruction below...</p>
    <div className="wrapper">
      <div className="instruction-container">
        <input type="radio" name="instruction" id="i1" checked />
        <label htmlFor="i1" className="instruction-card">
          <div className="instruction-row">
            <div className="instruction-icon">1</div>
            <div className="instruction-desc">
              <h4>Download Metamask</h4>
              <p>Please go to metamask.io and download metamask.</p>
            </div>
          </div>
        </label>
        <input type="radio" name="instruction" id="i2" checked />
        <label htmlFor="i2" className="instruction-card">
          <div className="instruction-row">
            <div className="instruction-icon">2</div>
            <div className="instruction-desc">
              <h4>Add to Browser</h4>
              <p>Choose browser to add metamask in.</p>
            </div>
          </div>
        </label>
        <input type="radio" name="instruction" id="i3" checked />
        <label htmlFor="i3" className="instruction-card">
          <div className="instruction-row">
            <div className="instruction-icon">3</div>
            <div className="instruction-desc">
              <h4>Create Wallet</h4>
              <p>Agree to terms of agreement and click create new wallet.</p>
            </div>
          </div>
        </label>
        <input type="radio" name="instruction" id="i4" checked />
        <label htmlFor="i4" className="instruction-card">
          <div className="instruction-row">
            <div className="instruction-icon">4</div>
            <div className="instruction-desc">
              <h4>Follow the Steps</h4>
              <p>Follow the steps in creating and securing your wallet.</p>
            </div>
          </div>
        </label>
        <input type="radio" name="instruction" id="i5" checked />
        <label htmlFor="i5" className="instruction-card">
          <div className="instruction-row">
            <div className="instruction-icon">5</div>
            <div className="instruction-desc">
              <h4>Connect to DocuMint</h4>
              <p>After setting up your wallet in metamask, you can now connect it to DocuMint.</p>
            </div>
          </div>
        </label>
      </div>
    </div>
    </>
  );
};

export default WalletSetupInstruction;
