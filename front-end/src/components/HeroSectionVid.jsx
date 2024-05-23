import React from "react";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileShield,
  faUniversalAccess,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const HeroSectionVid = () => {
  return (
    <div className="containers">
      <h1>Secure Your Documents, Protect Our Trees</h1>
      <br />
      <em>
        "Convert your important papers into tamper-proof NFTs - Secure,
        Accessible, Eco-friendly."
      </em>
      <br />
      <div className="cards">
        <div className="card">
          <div className="inner">
            <div className="front_face">
              <h1>Secure</h1>
              <FontAwesomeIcon icon={faFileShield} />
            </div>
            <div className="back_face">
              <h1>Secure</h1> <br />
              Your documents are protected on the blockchain.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="inner">
            <div className="front_face">
              <h1>Accessible</h1>
              <FontAwesomeIcon icon={faUniversalAccess} />
            </div>
            <div className="back_face">
              <h1>Accessible</h1> <br />
              Retrieve your documents anytime, anywhere.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="inner">
            <div className="front_face">
              <h1>Eco-Friendly</h1>
              <FontAwesomeIcon icon={faLeaf} />
            </div>
            <div className="back_face">
              <h1>Eco-Friendly</h1> <br />
              Reduce paper waste and contribute to a greener planet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionVid;
