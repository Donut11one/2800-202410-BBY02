import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const addWalletListener = async () => {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        console.log("Account changed:", accounts[0]);
                        setWalletAddress(accounts[0]);
                    } else {
                        console.log("No accounts found. Redirecting to home.");
                        setWalletAddress("");
                        navigate("/home");
                    }
                });

                window.ethereum.on("disconnect", (error) => {
                    console.log("Wallet disconnected:", error);
                    setWalletAddress("");
                    navigate("/home");
                });
            } else {
                console.log("Please install Metamask");
            }
        };

        const getCurrentWalletConnected = async () => {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_accounts",
                    });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                        console.log(accounts[0]);
                    } else {
                        console.log("Please connect your wallet.");
                    }
                } catch (err) {
                    console.error(err.message);
                }
            } else {
                console.log("Please install Metamask");
            }
        };

        getCurrentWalletConnected();
        addWalletListener();
    }, [navigate]);

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                console.log(accounts[0]);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            console.log("Please install Metamask");
        }
    };

    const getShortenedAddress = (address) => {
        if (!address) return "";
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    return {
        walletAddress,
        connectWallet,
        getShortenedAddress,
    };
};

export default useWallet;