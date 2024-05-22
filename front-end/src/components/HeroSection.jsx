import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import Login from "./Login";
import SignUp from "./SignUp";

const HeroSection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  useEffect(() => {
    if (showLoginModal || showSignUpModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showLoginModal, showSignUpModal]);

  return (
    <div className="hero-container relative">
      <div className="absolute  flex flex-col items-center justify-center">
        <div className="hero-btns flex flex-col md:flex-row items-center">
          <Button
            // className="btns mb-4 bg-green-400 hover:bg-green-500"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
            // buttonSize="btn--large"
            onClick={openLoginModal}
          >
            LOGIN
          </Button>
          <Button
            // className="btns bg-green-400 hover:bg-green-500"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
            // buttonSize="btn--large"
            onClick={openSignUpModal}
          >
            SIGN UP
          </Button>
        </div>
      </div>
      {(showLoginModal || showSignUpModal) && <div className="modal-overlay"></div>}
      {showLoginModal && <Login onClose={closeLoginModal} />}
      {showSignUpModal && <SignUp onClose={closeSignUpModal} />}
    </div>
  );
};

export default HeroSection;
