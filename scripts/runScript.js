const path = require('path');
const pinFileToIPFS = require('./pinFileToIPFS');
const filePath = path.join(__dirname, '../assets/output-onlinefiletools.txt');
// const filePath = path.join(__dirname, '../data/metadata.json');

//Runs the pinFileToIPFS and returns the hash value of the image
const filehash = async (path) => {
    const temp = await pinFileToIPFS(path);
    console.log(temp);
    console.log("sucessfully get hash from IPFS")
    var imageurl = "https://ipfs.io/ipfs/" +  temp;
    console.log(imageurl);
    console.log("Sucessfully convert to url");
}
filehash(filePath)


//pin image -> pin metadata -> smart-contract
//connects wallet -> Our platform pins the image (User waits) -> User has a mint button