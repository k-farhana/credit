require("@nomicfoundation/hardhat-toolbox");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const { projectId, mnemonic } = require('./secrets.json');

module.exports = {
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  solidity: "0.8.0",
};

