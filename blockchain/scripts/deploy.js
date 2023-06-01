const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CreditSystem = await hre.ethers.getContractFactory("CreditSystem");
  const creditSystem = await CreditSystem.deploy();

  console.log("Contract deployed to address:", creditSystem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
