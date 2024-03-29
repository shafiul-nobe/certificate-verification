// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config();
const CONTRACT = process.env.CONTRACT;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  if(CONTRACT == 'institute') {
    const _issuerContractAddress = "0x2C84a6BbA4D8B302032572427D72911A7128Df61"; 
    const _institutionWallet = "0x2C84a6BbA4D8B302032572427D72911A7128Df61";

    const Institution = await hre.ethers.getContractFactory("Institution");
    const institution = await Institution.deploy(_issuerContractAddress, _institutionWallet);

    await institution.deployed();
  } 

  if(CONTRACT == 'controller') {
    const Controller = await hre.ethers.getContractFactory("Controller");
    const controller = await Controller.deploy(_issuerContractAddress, _institutionWallet);

    await controller.deployed();
  }

  

  console.log("Institution deployed to:", institution.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
