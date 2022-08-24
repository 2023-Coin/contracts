const hre = require('hardhat');

async function main() {
  const _2023Coin = await hre.ethers.getContractFactory('_2023Coin');
  const _2023CoinInstance = await _2023Coin.deploy();
  await _2023CoinInstance.deployed();
  console.log(`2023 Coin deployed at ${_2023CoinInstance.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
