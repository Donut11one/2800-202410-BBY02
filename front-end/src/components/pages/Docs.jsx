import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../assets/helper-hardhat-config";
import { Result, ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import axios from "axios";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faArrowRightArrowLeft,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";


const Docs = ({ wallet, networkSupported }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [show, setShow] = useState(false);
    const [receiverAddress, setReceiverAddress] = useState("");
    const [burnId, setBurnId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setBurnId(id);
        setShow(true);
    };

    const burnDoc = async (_id) => {
        console.log("BURNING " + _id);
        console.log("BURNING " + _id);
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const res = await contract.burnDoc(_id);
        console.log("burned")
        handleClose();
    };

    const handleCloseTransferModal = () => {
        setShowTransferModal(false);
        setReceiverAddress("");
    };

    const handleShowTransferModal = (id) => {
        setBurnId(id);
        setShowTransferModal(true);
    };

    const transferDoc = (id, receiver) => {
        console.log("transfer " + id);
    };

    useEffect(() => {
        if (networkSupported) {
            const fetchTokenData = async () => {
                try {
                    const provider = new Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                    const tokenIdsOwned = await contract.owns(wallet);
                    setTokenIds(Object.values(tokenIdsOwned).map((id) => id.toString()));
                    const tokenURIs = await Promise.all(
                        tokenIdsOwned.map(async (id) => {
                            return await contract.tokenURI(id);
                        })
                    );
                    setTokenURIs(tokenURIs);
                    const metadataArray = await Promise.all(
                        tokenURIs.map(async (uri) => {
                            const response = await axios.get(uri);
                            return response.data;
                        })
                    );
                    setMetadata(metadataArray);
                } catch (error) {
                    console.error("Error fetching token data:", error);
                }
            };
            fetchTokenData();
        }
    }, [networkSupported, wallet]);

    if (wallet === "") {
        return <Navigate to="/home" />;
    }

    return (
        <>
            <Navbar />
            {networkSupported ? (
                <div id="DocumentMain">
                    <h2>Your DocuMints</h2>
                    <div className="doc-wrapper">
                        {metadata.map((document, index) => (
                            <div className="doc-card" key={index}>
                                <h2>{document.name}</h2>
                                <h2>Document's Id: {tokenIds[index]}</h2>
                                <img src={document.image} alt="doc image" className="doc-image" />
                                <div className="doc-controls">
                                    <button onClick={() => { handleShowTransferModal(tokenIds[index]) }}>Transfer <FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
                                    <button onClick={() => { handleShow(tokenIds[index]) }}>Burn <FontAwesomeIcon icon={faFire} /></button>
                                    <button>Details <FontAwesomeIcon icon={faCircleInfo} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="Error">
                    <h1>Unsupported Network</h1>
                    <p>Connect to Sepolia network</p>
                </div>
            )}
            <Footer />

            {/* Burn Modal */}
            <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${show ? '' : 'hidden'}`} onClick={handleClose}>
                <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5" style={{ background: "linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)" }}>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
                        Confirm Burn
                    </h2>
                    <p className="text-white">Are you sure you want to burn this document? This action can't be undone.</p>
                    <div className="mt-4 flex justify-end">
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={() => burnDoc(burnId)}>
                            Burn
                        </button>
                    </div>
                </div>
            </div>

            {/* Transfer Modal */}
            <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${showTransferModal ? '' : 'hidden'}`} onClick={handleCloseTransferModal}>
                <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5" style={{ background: "linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)" }}>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
                        Transfer Document
                    </h2>
                    <label htmlFor="receiverAddress" className="text-white">Receiver Address:</label>
                    <input
                        type="text"
                        id="receiverAddress"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="border border-gray-300 rounded-md p-1 w-full"
                    />
                    <div className="mt-4 flex justify-end">
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={handleCloseTransferModal}>
                            Cancel
                        </button>
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={() => transferDoc(burnId)}>
                            Transfer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Docs;
