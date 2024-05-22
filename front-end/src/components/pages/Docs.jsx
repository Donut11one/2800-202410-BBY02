import React from "react";
import Navbar from "../Navbar";
import useWallet from "../../hooks/useWallet";
import { Navigate } from "react-router-dom";

const Docs = ({ wallet }) => {
    if (wallet === "") {
        // Redirect to the home page if wallet is not connected
        return <Navigate to="/home" />
    }
    console.log("document " + wallet)
    return (
        <>
            <Navbar />
            <p>Wallet Address: </p>
        </>
    );
}

export default Docs;
