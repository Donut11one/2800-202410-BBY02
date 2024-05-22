import { useState, useEffect, useRef } from "react";

const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const walletAddressRef = useRef("");

    useEffect(() => {
        const addWalletListener = async () => {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        console.log("Account changed:", accounts[0]);
                        setWalletAddress(accounts[0]);
                        walletAddressRef.current = accounts[0];
                    } else {
                        console.log("No accounts found. Redirecting to home.");
                        setWalletAddress("");
                        walletAddressRef.current = "";
                        setWalletConnected(false);
                    }
                });

                window.ethereum.on("disconnect", (error) => {
                    console.log("Wallet disconnected:", error);
                    setWalletAddress("");
                    walletAddressRef.current = "";
                    setWalletConnected(false);

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
                        walletAddressRef.current = accounts[0];
                        setWalletConnected(true);
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
    }, []);

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                walletAddressRef.current = accounts[0];
                setWalletConnected(true);
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
        walletConnected,
        connectWallet,
        getShortenedAddress,
    };
};

export default useWallet;
