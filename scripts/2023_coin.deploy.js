const hre = require('hardhat');

async function main() {
  const _2023Coin = await hre.ethers.getContractFactory('_2023Coin');
  const _2023CoinInstance = await _2023Coin.deploy();
  await _2023CoinInstance.deployed();
  console.log(`2023 Coin deployed at ${_2023CoinInstance.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0x#code
// Testnet Contract: https://testnet.bscscan.com/address/0xFd3ccE6b80f751E51b728541fa1A0c721cBAbF3F#code
// npx hardhat verify 0xFd3ccE6b80f751E51b728541fa1A0c721cBAbF3F --network bsc_testnet

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
