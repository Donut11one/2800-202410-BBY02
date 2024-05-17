const docuMinter = artifacts.require('DocuMinter');
module.exports = function (deployer) {
    deployer.deploy(docuMinter);
};