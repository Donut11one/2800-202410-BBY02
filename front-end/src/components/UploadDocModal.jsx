import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../assets/helper-hardhat-config.js";
import { Web3Provider } from "@ethersproject/providers";

import { React,  useState } from "react";
import filehash from "../runScript.js";
import useWallet from "../hooks/useWallet.jsx";
import switchNetworkImg from "../assets/images/switch-network.png"

const UploadDocModal = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(""); // State for file
  const {networkSupported} = useWallet();

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

  const handleClose = (e) => {
    if(e.target.id === 'upload-doc-wrapper') onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="upload-doc-wrapper" onClick={handleClose}>
      <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
          Upload document
        </h2>
        {networkSupported ? (
          <div>
            <form id="userUpload" className="space-y-3 flex flex-col">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5"
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
              <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" type="button" onClick={handleSubmit}>
                DocuMint
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1>Unsupported Network</h1>
            <p>Please switch to Sepolia network in your metamask</p>
            <img 
              src={switchNetworkImg}
              alt=""
              className="w-40 mx-auto"
            />
          </div>
        )}

        <button onClick={onClose} className="btn btn--outline btn--medium w-1/4 mt-3 mx-auto font-bold">
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadDocModal;
