import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import HeroSectionVid from "./HeroSectionVid";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video className="vid" src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>DocuMint</h1>
      <HeroSectionVid />
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--medium"
        >
          LOGIN
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
