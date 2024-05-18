import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import logo from "../../assets/images/DocuMintHorizontal.png";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import "./Landing.css";
const Landing = ({ user }) => {
  if (user) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <>
    
    <div id = "main">  
      <div id = "logo">
        <img src={logo} alt="DocuMint Logo" id = 'logodisplay'/> 

      </div>
      <HeroSection />
    </div>
      <Footer />
    </>

  );
};

export default Landing;
