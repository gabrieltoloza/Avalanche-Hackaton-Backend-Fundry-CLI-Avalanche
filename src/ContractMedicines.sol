// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";



contract MedicineManager is ERC721, ERC721Pausable, Ownable, ERC721Burnable {




    uint256 private _nextTokenId;
    

    // mapeo de tokingId con tokenUri
    mapping(uint256 => string) private _tokenURIs;





    constructor(address initialOwner)
        ERC721("MedicineTokenization", "MDC")
        Ownable(initialOwner)
    {}



    // Funcion para pausar el contrato en caso de alguna contingencia
    function pause() public onlyOwner {
        _pause();
    }

    // Funcion para volver a correr el contrato al salir de la contingencia
    function unpause() public onlyOwner {
        _unpause();
    }









    // Funcion para mintear un nuevo token y setear/vincular el tokenId con su TokenUri
    function safeMint(address to, string memory tokenURI_) public onlyOwner {

        uint256 tokenId = ++_nextTokenId;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);

    }





    // Funcion para setear/vincular un tokenId con su TokenUri
    function _setTokenURI(uint256 tokenId, string memory tokenURI_) internal {
        require(_nextTokenId >= tokenId, NonexistentTokenURI());
        _tokenURIs[tokenId] = tokenURI_;
    }


    



    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }



    // View functions:
    // View functions:
    // View functions:


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_nextTokenId >= tokenId, NonexistentURIQuery());
        return _tokenURIs[tokenId];
    }


    function getNextTokenId() public view returns (uint256){
        return _nextTokenId;
    }


    // Errors:
    // Errors:
    // Errors:
    error NonexistentTokenURI();
    error NonexistentURIQuery();



}