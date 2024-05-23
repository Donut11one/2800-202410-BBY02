import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../assets/helper-hardhat-config";
import { Result, ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faArrowRightArrowLeft,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

import useWallet from "../../hooks/useWallet";



//Add required sepolia network for metamask
const Docs = ({ wallet }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    const [metadata, setMetadata] = useState([]);

    const { networkSupported } = useWallet()

    const burnDoc = (_id) => {
        console.log("BURN " + _id)
    }

    const transferDoc = (id) => {
        console.log("transfer " + id)
    }

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                // Connect to Ethereum provider
                const provider = new Web3Provider(window.ethereum);
                const signer = provider.getSigner();


                // Instantiate the contract
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                // Call the smart contract function owns(address)
                const tokenIdsOwned = await contract.owns(wallet);

                // Set tokenIds state
                console.log(tokenIdsOwned)
                setTokenIds(Object.values(tokenIdsOwned).map((id) => id.toString()));
                console.log(tokenIds);

                // Call the smart contract function tokenURI(id) for each token
                const tokenURIs = await Promise.all(
                    tokenIdsOwned.map(async (id) => {
                        return await contract.tokenURI(id);
                    })
                );

                // Set tokenURIs state
                setTokenURIs(tokenURIs);

                const metadataArray = await Promise.all(
                    tokenURIs.map(async (uri) => {
                        const response = await axios.get(uri);
                        return response.data;
                    })
                );

                // Log metadata to see the structure
                console.log(metadataArray);
                setMetadata(metadataArray)

            } catch (error) {
                console.error("Error fetching token data:", error);
            }
        };

        fetchTokenData();

    }, []);
    if (wallet === "") {
        // Redirect to the home page if wallet is not connected
        return <Navigate to="/home" />
    }
    return (
        <>
            <Navbar />
            {networkSupported ? (
                <div id = "DocumentMain">
                    <h2>Owned Tokens</h2>
                    <div className="doc-wrapper">
                        {metadata.map((document, index) => (
                            <div className="doc-card" key={index}>
                                <h2>{document.name}</h2>
                                <h2>Document's Id: {tokenIds[index]}</h2>
                                <img src={document.image} alt="doc image" className="doc-image" />
                                <div className="doc-controls">
                                    <button onClick={() => { transferDoc(tokenIds[index]) }}>Transfer <FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
                                    <button onClick={() => { burnDoc(tokenIds[index]) }}>Burn <FontAwesomeIcon icon={faFire} /></button>
                                    <button>Details <FontAwesomeIcon icon={faCircleInfo} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>) : (<div>
                    <h2>Unsupported Network</h2>
                    <p>Please connect to the Sepolia network to use this application.</p>
                </div>)}
                <Footer />
        </>
    );
}

export default Docs;
