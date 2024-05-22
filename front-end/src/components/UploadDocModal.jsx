import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../assets/helper-hardhat-config.js";
import { Web3Provider } from "@ethersproject/providers";

import React, { useState } from "react";
import filehash from "../runScript.js";

const UploadDocModal = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [description, setDescription] = useState(""); // State for description
  const [file, setFile] = useState(""); // State for file

  const handleSubmit = async () => {
    const metadata = {
      name,
      description,
      file,
    };


    const str = JSON.stringify(metadata);
    const fileblob = new File([str], {
      name: "MetaJson"
    });

    const dataurl = await filehash(fileblob);
    console.log(dataurl);
    mintNFT(dataurl);
  };

  const mintNFT = async (jsondata) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    try {
      // Connect to Ethereum provider
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      // Instantiate the contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call the smart contract function owns(address)
      const tokenIdsOwned = await contract.mintDoc(jsondata);

      // Set tokenIds state
      setTokenIds(tokenIdsOwned);

      // Call the smart contract function tokenURI(id) for each token
      const tokenURIs = await Promise.all(
        tokenIdsOwned.map(async (id) => {
          return await contract.tokenURI(id);
        })
      );

      // Set tokenURIs state
      setTokenURIs(tokenURIs);
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  }

  return (
    <div className="flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
          Upload document
        </h2>
        <div>
          <form id="userUpload">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              id="fileupload"
              onChange={async (e) => setFile(await filehash(e.target.files[0]))}
            />
            <button type="button" onClick={handleSubmit}>
              Mint Document
            </button>
          </form>
        </div>
        <button onClick={onClose} className="btn btn--outline">
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadDocModal;
