import React from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../assets/helper-hardhat-config";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useState, useEffect } from "react";


const Docs = ({ wallet }) => {
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenURIs, setTokenURIs] = useState([]);

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
                    {tokenIds.map((id, index) => (
                        <li key={index}>
                            Token ID: {id}, Token URI: {tokenURIs[index]}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Docs;
