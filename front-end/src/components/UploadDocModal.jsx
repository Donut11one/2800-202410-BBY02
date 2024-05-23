import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../assets/helper-hardhat-config.js";
import { Web3Provider } from "@ethersproject/providers";

import { React,  useState } from "react";
import filehash from "../runScript.js";

const UploadDocModal = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(""); // State for file

  const handleSubmit = async () => {
    const metadata = {
      name,
      description,
      image,
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
    try {
      // Connect to Ethereum provider
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Instantiate the contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call the smart contract function mintDoc to mint document
      const tokenIdsOwned = await contract.mintDoc(jsondata);


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
              onChange={async (e) => setImage(await filehash(e.target.files[0]))}
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
