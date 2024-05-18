const { ethers, network } = require("hardhat")
const { CONTRACT_ADDRESS } = require("../helper-hardhat-config")

async function mintNFT() {
    uri = "https://ipfs.io/ipfs/Qmf1xsgFVmBkKBHknJG88y6pytLJbtWMAjDR9XGV2Sp6ZB"
    const docuMinter = await ethers.getContractAt("DocuMinter", CONTRACT_ADDRESS);
    console.log("Minting...");
    const mintTX = await docuMinter.owns("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    const mintTxReceipt = mintTX[0];
    const res = await docuMinter.tokenURI(mintTxReceipt)
    console.log(res)
}

mintNFT().then(() => {
    process.exit(0)
}).catch((error) => {
    console.error(error)
    process.exit(1)
})

