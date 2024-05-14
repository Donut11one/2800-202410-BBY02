require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();


const RPC = process.env.ETH_CLIENT_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: RPC,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    }
  }
};
