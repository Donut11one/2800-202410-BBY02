import { useState, useEffect, useRef } from "react";

const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const [networkSupported, setNetworkSupported] = useState(false);
    const walletAddressRef = useRef("");

    useEffect(() => {
        const addWalletListener = async () => {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (accounts.length > 0) {
                        console.log("Account changed:", accounts[0]);
                        setWalletAddress(accounts[0]);
                        walletAddressRef.current = accounts[0];
                        checkNetwork();
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
                    setNetworkSupported(false);
                });

                window.ethereum.on("chainChanged", () => {
                    checkNetwork();
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
                        checkNetwork();
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

        const checkNetwork = async () => {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                const chainId = await window.ethereum.request({
                    method: "eth_chainId",
                });
                if (chainId === "0xaa36a7") { // Sepolia chain ID in hex (11155111 in decimal)
                    setNetworkSupported(true);
                } else {
                    setNetworkSupported(false);
                    console.log("Please connect to the Sepolia network.");
                }
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
                checkNetwork();
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
        networkSupported,
        connectWallet,
        getShortenedAddress,
    };
};

export default useWallet;
