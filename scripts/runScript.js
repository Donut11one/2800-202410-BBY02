const path = require('path');
const pinFileToIPFS = require('./pinFileToIPFS');
// const filePath = path.join(__dirname, '../assets/4e1l81.jpg');
const filePath = path.join(__dirname, '../data/metadata.json');
pinFileToIPFS(filePath);