// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Mint NFT from passed URI
//transfer documents ownership
//Improve token URI storage
contract DocuMinter is Ownable, ERC721 {
    uint256 private s_tokenCounter;
    using Strings for uint256;
    //URI accsess
    mapping(uint256 => string) private _tokenURIs;

    string private _baseURIextended;

    constructor() ERC721("DocuMinted", "DCMNT") Ownable(msg.sender) {
        s_tokenCounter = 0;
    }

    //because it's Public anyone can see the document details
    //We need to decide wether onlyOwner will see the URI to display on the website or make it public to anyone
    //assumes that token ID exists. For improvement needs validation that Id exists
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURIextended;
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function mintDoc(string memory _tokenURI) public returns (uint256) {
        s_tokenCounter += 1;
        uint256 newId = s_tokenCounter;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, _tokenURI);
        return newId;
    }

    function totalMinted() public view returns (uint256) {
        return s_tokenCounter;
    }
}
