// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error DocuMinter__NoDocumentsMinted();
error DocuMinter__NotAuthorizedToOperate();

//Mint NFT from passed URI
//transfer documents ownership
//Burn NFTs
contract DocuMinter is Ownable, ERC721 {
    uint256 private s_tokenCounter;
    using Strings for uint256;
    //URI accsess
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) private belongings;

    string private _baseURIextended;

    constructor() ERC721("DocuMinted", "DCMNT") Ownable(msg.sender) {
        s_tokenCounter = 0;
    }

    //We need to decide wether onlyOwner will see the URI to display on the website or make it public to anyone
    //assumes that token ID exists. For improvement needs validation that Id exists
    function tokenURI(
        uint256 tokenId
    ) public view virtual override onlyOwner returns (string memory) {
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

    /**
     * Transfers the ownership of the NFT
     * @param _receiver Address of the receiver
     * @param _tokenId An ID of the NFT
     */
    function conductTransfer(
        //CHANGE IDS IN THE MAPPINGS
        address _receiver,
        uint256 _tokenId
    ) external {
        if (ownerOf(_tokenId) == msg.sender) {
            _safeTransfer(msg.sender, _receiver, _tokenId);
            removeValue(msg.sender, _tokenId);
            belongings[_receiver].push(_tokenId);
        } else {
            revert DocuMinter__NotAuthorizedToOperate();
        }
    }

    /**
     * Can be called only by the owner.
     * @param ownerAddress address of the caller
     * @return belongings[ownerAddress] List of all NFTs' ids owned by the user
     */
    function owns(address ownerAddress) public view returns (uint256[] memory) {
        if (ownerAddress == msg.sender) {
            if (belongings[ownerAddress].length > 0) {
                return belongings[ownerAddress];
            }
            revert DocuMinter__NoDocumentsMinted();
        } else {
            revert DocuMinter__NotAuthorizedToOperate();
        }
    }

    /**
     *
     * @param _tokenURI  URI with the metadata
     * @return  newId The id of the recently created NFT
     */
    function mintDoc(string memory _tokenURI) external returns (uint256) {
        s_tokenCounter += 1;
        uint256 newId = s_tokenCounter;
        belongings[msg.sender].push(newId);
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, _tokenURI);
        return newId;
    }

    /**
     * Deletes the NFT by sending it to the null address
     * @param _tokenId An ID of the NFT
     */
    function burnDoc(uint256 _tokenId) external {
        if (ownerOf(_tokenId) == msg.sender) {
            _burn(_tokenId);
            delete _tokenURIs[_tokenId];
            removeValue(msg.sender, _tokenId);
        } else {
            revert DocuMinter__NotAuthorizedToOperate();
        }
    }

    function removeValue(address user, uint256 value) internal returns (bool) {
        for (uint256 i = 0; i < belongings[user].length; i++) {
            if (belongings[user][i] == value) {
                // Move the last element to the position of the element to delete
                belongings[user][i] = belongings[user][
                    belongings[user].length - 1
                ];
                // Remove the last element
                belongings[user].pop();
                return true;
            }
        }
        return false; // Value not found
    }

    function totalMinted() external view returns (uint256) {
        return s_tokenCounter;
    }
}
