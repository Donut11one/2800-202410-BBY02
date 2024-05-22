import React from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../assets/helper-hardhat-config";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useState, useEffect } from "react";
import axios from "axios";


const Docs = ({ wallet }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);
    const [metadata, setMetadata] = useState([])

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                // Connect to Ethereum provider
                const provider = new Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Contract address and ABI


                // Instantiate the contract
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                // Call the smart contract function owns(address)
                const tokenIdsOwned = await contract.owns(wallet);

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
    console.log("document " + wallet)
    return (
        <>
            <Navbar />
            <p>Wallet Address: {wallet}</p>
            <div>
                <h2>Owned Tokens</h2>
                <ul>
                    {metadata.map((document, index) => (
                        <li key={index}>
                            <h2>{document.name}</h2>
                            <img src={document.image} alt="doc image" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Docs;
