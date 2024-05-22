import axios from 'axios';
import FormData from 'form-data';

// Calls Pinata API's to pin file to IPFS
const pinFileToIPFS = async (file) => {
    const pinataEndpoint = process.env.REACT_APP_PINATA_ENDPOINT;
    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataApiSecret = process.env.REACT_APP_PINATA_API_SECRET;

    const formatData = new FormData();
    formatData.append("file", file);

    try {
        const response = await axios.post(pinataEndpoint, formatData, {
            maxContentLength: 'Infinity',
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataApiSecret,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Successfully pinned file to IPFS : ', response.data);
        return response.data.IpfsHash;
    } catch (err) {
        console.log('Error occurred while pinning file to IPFS: ', err);
    }
};

export default pinFileToIPFS;
