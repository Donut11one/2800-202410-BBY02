import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import HeroSectionVid from "./HeroSectionVid";
import Login from "./Login";
import SignUp from "./SignUp";

const HeroSection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <div className="hero-container relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <HeroSectionVid />
        <div className="hero-btns flex flex-col items-center">
          <Button
            className="btns mb-4 bg-green-400 hover:bg-green-500"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
            onClick={openLoginModal}
          >
            LOGIN
          </Button>
          <Button
            className="btns bg-green-400 hover:bg-green-500"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={openSignUpModal}
          >
            SIGN UP
          </Button>
        </div>
      </div>
      {showLoginModal && <Login onClose={closeLoginModal} />}
      {showSignUpModal && <SignUp onClose={closeSignUpModal} />}
    </div>
  );
};

export default HeroSection;
