import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../fbconfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faClipboardQuestion,
  faHandshakeAngle,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../public/images/DocuMintHorizontal.png";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  window.addEventListener("resize", showButton);

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
              <Link to="" className="nav-links" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faClipboardQuestion} />
                FAQs
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

            <li>
              <Link
                to=""
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Connect Wallet
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Connect Wallet</Button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
