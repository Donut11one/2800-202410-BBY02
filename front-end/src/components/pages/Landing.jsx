import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";

const Landing = ({ user }) => {
  if (user) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
};

export default Landing;
