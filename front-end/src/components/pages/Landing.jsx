import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";
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
        {/* <img src="/DocuMintFull.png" alt="DocuMint Logo" className="img" />  */}
        <img src="/DocuMintHorizontal.png" alt="DocuMint Logo" id = 'logodisplay'/> 
        {/* <img src="/DM_Circle_Small.png" alt="DocuMint Logo" className="img" />  */}
        {/* <img src="/DM_Circle.png" alt="DocuMint Logo" className="img" />  */}
      </div>
      <HeroSection />
    </div>
      <Footer />
    </>

  );
};

export default Landing;
