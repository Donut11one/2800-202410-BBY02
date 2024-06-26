import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../assets/helper-hardhat-config";
import { Result, ethers } from "ethers";
import { isAddress } from "web3-validator";
import { Web3Provider } from "@ethersproject/providers";
import axios from "axios";
import QRCode from "qrcode.react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faArrowRightArrowLeft,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import switchNetworkImg from "../../assets/images/switch-network.png"
import easteregg from "../../assets/images/nyan-cat.gif";

const Docs = ({ wallet, networkSupported }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [show, setShow] = useState(false);
    const [receiverAddress, setReceiverAddress] = useState("");
    const [burnId, setBurnId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showDetails, setDetails] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setBurnId(id);
        setShow(true);
    };

    const burnDoc = async (_id) => {
        console.log("BURNING " + _id);
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const res = await contract.burnDoc(_id);
        console.log("burned");
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

    const handleShowDetailsModal = (document) => {
        setSelectedDoc(document);
        setDetails(true);
    };

    const transferDoc = async (id, receiver) => {
        if (isAddress(receiver)) {
            setErrorMessage("");
            console.log("transfer " + id + " to " + receiver);
            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const res = await contract.conductTransfer(receiver, id);
            console.log("transferred");
            setShowTransferModal(false);
        } else {
            setErrorMessage("Invalid Ethereum address.");
        }
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

    //easter egg
    var counter = 0;
    useEffect(() => {
        const handleLoad = () => {
            let limit = (Math.random() * 1000) + 100;
            counter++;
            console.log(counter, limit);
            if (counter >= limit) {
                let eggelement = document.getElementById('easteregg');
                eggelement.style.display = "block";
            }
        };
        document.addEventListener('click', handleLoad);
        return () => {
            document.removeEventListener('click', handleLoad);
        };
    }, []);

    return (
        <>
            <Navbar />
            {networkSupported ? (
                <div id="DocumentMain" className="kenburns-top">
                    <h2>Your DocuMints</h2>
                    <div className="doc-wrapper">
                        {metadata.map((document, index) => (
                            <div className="doc-card" key={index}>
                                <div className="doc-name">
                                    <h2>{document.name}</h2>
                                    <p>Id: {tokenIds[index]}</p>
                                </div>
                                <img src={document.image} alt="doc image" className="doc-image" />
                                <div className="doc-controls">
                                    <button onClick={() => { handleShowTransferModal(tokenIds[index]) }}>Transfer <FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
                                    <button onClick={() => { handleShow(tokenIds[index]) }}>Burn <FontAwesomeIcon icon={faFire} /></button>
                                    <button onClick={() => { handleShowDetailsModal(document) }}>Details <FontAwesomeIcon icon={faCircleInfo} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="upload-doc-wrapper" onClick={handleClose}>
                    <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] mx-auto flex flex-col p-5">
                        <div className="flex flex-col">
                            <h1>Unsupported Network</h1>
                            <p>Please switch to Sepolia network in your metamask</p>
                            <img
                                src={switchNetworkImg}
                                alt="Switch network"
                                className="w-40 mx-auto"
                            />
                        </div>
                    </div>
                </div>
            )}
            <div id='easteregg'>
                <img src={easteregg} alt="easter egg" id="easter-egg-image" />
            </div>
            <Footer />

            {/* Burn Modal */}
            <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${show ? '' : 'hidden'}`} >
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
            <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${showTransferModal ? '' : 'hidden'}`} >
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
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <div className="mt-4 flex justify-end">
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={handleCloseTransferModal}>
                            Cancel
                        </button>
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={() => transferDoc(burnId, receiverAddress)}>
                            Transfer
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${showDetails ? '' : 'hidden'}`} >
                <div className="upload-doc-modal text-xl rounded-lg shadow-lg md:w-[600px] w-[90%] max-h-[80%] overflow-y-auto mx-auto flex flex-col p-5" style={{ background: "linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)" }}>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
                        Document Details
                    </h2>
                    {selectedDoc && (
                        <>
                            <h3 className="text-xl font-bold" style={{ color: "white" }}>{selectedDoc.name}</h3>
                            <img src={selectedDoc.image} alt="doc image" className="doc-image mb-4" />
                            <p className="text-white mb-4">{selectedDoc.description}</p>
                            <QRCode value={JSON.stringify(selectedDoc)} size={256} bgColor={"#ffffff"} fgColor={"#000000"} level={"Q"} includeMargin={false} style={{ margin: "auto" }} />
                        </>
                    )}
                    <div className="mt-4 flex justify-end">
                        <button className="btn btn--outline btn--medium w-1/4 mx-auto font-extrabold" onClick={() => { setDetails(false) }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Docs;
