import { ethers } from "ethers";

const privateKey = "0xfe6b67d95c8139965f8f00e6df4226491e43c0828da279f73d0cc533daec48b0";
const wallet = new ethers.Wallet(privateKey);

console.log("Address:", wallet.address);