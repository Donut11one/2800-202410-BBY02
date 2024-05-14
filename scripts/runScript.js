const path = require('path');
const pinFileToIPFS = require('./pinFileToIPFS');
// const filePath = path.join(__dirname, '../assets/test.jpg');
const filePath = path.join(__dirname, '../data/metadata.json');
pinFileToIPFS(filePath);

//pin image -> pin metadata -> smart-contract
//connects wallet -> Our platform pins the image (User waits) -> User has a mint button