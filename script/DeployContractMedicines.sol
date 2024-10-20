// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;


import "forge-std/Script.sol";
import "../src/ContractMedicines.sol";


contract DeployMedicineManager is Script {
    function run() external {
        
        vm.startBroadcast();

        address ownerStart = 0x462111Ce76F6738AB2c0A9ABD967883E2c2DE00a;
        
        new MedicineManager(ownerStart);

        vm.stopBroadcast();
    }
}