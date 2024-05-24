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
import { Modal, Button } from 'react-bootstrap';


const Docs = ({ wallet, networkSupported }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [metadata, setMetadata] = useState([]);
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

    const transferDoc = (id) => {
        console.log("transfer " + id);
    };

    useEffect(() => {
        console.log(networkSupported);
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

            <Modal show={show} onHide={handleClose} style={{ background: "rgba(0, 0, 0, 0.212)" }} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white", border: "none" }}>
                    <Modal.Title>Confirm Burn</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white" }}>Are you sure you want to burn this document? This action can't be undone.</Modal.Body>
                <Modal.Footer style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => burnDoc(burnId)}>
                        Burn
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTransferModal} onHide={handleCloseTransferModal} style={{ background: "rgba(0, 0, 0, 0.212)" }} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white", border: "none" }}>
                    <Modal.Title>Transfer Document</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white", border: "none" }}>
                    <label htmlFor="receiverAddress">Receiver Address:</label>
                    <input
                        type="text"
                        id="receiverAddress"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="border border-gray-300 rounded-md p-1 w-full"
                    />
                </Modal.Body>
                <Modal.Footer style={{ background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(4, 49, 54) 100%)', color: "white", border: "none" }}>
                    <Button variant="secondary" onClick={handleCloseTransferModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => transferDoc(burnId, receiverAddress)}>
                        Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Docs;
