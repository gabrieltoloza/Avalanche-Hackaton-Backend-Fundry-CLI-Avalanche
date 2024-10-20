// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Script.sol";


interface IContractMedicines {

    function safeMint(address to, string memory tokenURI_) external;
    function balanceOf(address owner) external view returns (uint256);
    function tokenURI(uint256 tokenId) external view returns (string memory);
    function getNextTokenId() external view returns (uint256);
    function burn(uint256 tokenID) external;

}



contract InteractSafeMint is Script {
    function run() external {
        address addressContract = 0x70419c32666043DE6329cD9cbf7E6EB551010041;

        address tokenOwner1 = 0x1127276076A30922484Aa85da548A4c459CeEb48;
        string memory tokenURI1 = "https://olive-payable-galliform-641.mypinata.cloud/ipfs/QmTTnLhMbGcWrDaGnWhGr88gkysuyGd9WSDcdu6xMxuZHZ";

        // address tokenOwner2 = 0x1127276076A30922484Aa85da548A4c459CeEb48;
        // string memory tokenURI2 = "https://olive-payable-galliform-641.mypinata.cloud/ipfs/QmUtTuNgSLaGWDjhidcRLigCdzYAS4tJayS33tVhDiDpyD";

        // address tokenOwner3 = 0x1127276076A30922484Aa85da548A4c459CeEb48;
        // string memory tokenURI3 = "https://olive-payable-galliform-641.mypinata.cloud/ipfs/QmaymcxE3t3ZNbKzJExYzBhWQhALUmnBaViuYV7pdaZuv1";

        IContractMedicines contractManager = IContractMedicines(addressContract);

        vm.startBroadcast();

        contractManager.safeMint(tokenOwner1, tokenURI1);

        vm.stopBroadcast();

    }
}

contract InteractbalanceOwner is Script {
        function run() external {
        address addressContract = 0x70419c32666043DE6329cD9cbf7E6EB551010041;

        address tokenOwner = 0x1127276076A30922484Aa85da548A4c459CeEb48;

        IContractMedicines contractManager = IContractMedicines(addressContract);

        vm.startBroadcast();

        uint256 balanceOwnerNFT = contractManager.balanceOf(tokenOwner);
        console.log("BalanceOwnerNFT: ", balanceOwnerNFT);
        vm.stopBroadcast();

    }
}



contract InteractTokenURI is Script {
    function run() external view {
        address addressContract = 0x70419c32666043DE6329cD9cbf7E6EB551010041;

        uint256 tokenId = 2;

        IContractMedicines contractManager = IContractMedicines(addressContract);

        // vm.startBroadcast();

        string memory tokenURI = contractManager.tokenURI(tokenId);

        console.log("TokenURI: ", tokenURI);
        // vm.stopBroadcast();
    }
}



contract InteractGetNextTokenId is Script {
    function run() external view {

        address addressContract = 0x70419c32666043DE6329cD9cbf7E6EB551010041;

        IContractMedicines contractManager = IContractMedicines(addressContract);

        uint256 nextTokenId = contractManager.getNextTokenId();

        console.log("nextTokenID: ", nextTokenId);

    }
}


contract InteractBurnTokenId is Script {
    function run() external {
        address addressContract = 0x70419c32666043DE6329cD9cbf7E6EB551010041;

        IContractMedicines contractManager = IContractMedicines(addressContract);
        
        uint256 tokenID4 = 4;
        // uint256 tokenID5 = 5;
        // uint256 tokenID6 = 6;

        vm.startBroadcast();

        contractManager.burn(tokenID4);

        vm.stopBroadcast();

    }
}