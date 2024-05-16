import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../public/images/DocuMintVertical.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithubAlt,
  faDiscord,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>Terms | Privacy | Docs | Feedback</p>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="documint-footer-logo">
            <img src={logo} alt="Logo" />
          </div>
          <small className="website-rights">DocuMint © 2024</small>
          <div className="social-icons">
            <Link
              className="social-icon-link"
              to=""
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              className="social-icon-link"
              to=""
              aria-label="Github"
            >
              <FontAwesomeIcon icon={faGithubAlt} />
            </Link>
            <Link
              className="social-icon-link"
              to=""
              aria-label="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </Link>
            <Link
              className="social-icon-link"
              to=""
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              className="social-icon-link"
              to=""
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
