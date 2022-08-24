require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-web3');
require('dotenv').config();
require('solidity-coverage');
require('hardhat-gas-reporter');

task(
  'accounts',
  'Prints the list of all available accounts',
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

task('balance', 'Prints the ether balance of an account')
  .addParam('account', 'The account to get the ether balance of')
  .setAction(async (taskArgs, hre) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    console.log(`${web3.utils.fromWei(balance, 'ether')} ETH`);
    console.log('Balance: ', balance);
  });

module.exports = {
  solidity: '0.8.16',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {},
    bsc_mainnet: {
      url: process.env.BSC_MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc_testnet: {
      url: process.env.BSC_TESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: 'BNB',
    gasPriceApi: 'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
  },
};
