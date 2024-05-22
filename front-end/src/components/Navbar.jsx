import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../fbconfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHandshakeAngle,
  faUser,
  faRightFromBracket,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../assets/images/DocuMintHorizontal.png";
import useWallet from "../hooks/useWallet"; // Adjust the path as needed

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { walletAddress, connectWallet, getShortenedAddress } = useWallet();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="documint-logo">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="" className="nav-links" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                Help
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/docgalery" className="nav-links" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faFolderOpen} />
                My Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-links" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-links" onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </li>
          </ul>
          {button && (
            walletAddress ? (
              <Button buttonStyle="btn--outline">{`Wallet Connected: ${getShortenedAddress(walletAddress)}`}</Button>
            ) : (
              <Button buttonStyle="btn--outline" onClick={connectWallet}>
                Connect your wallet!
              </Button>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
