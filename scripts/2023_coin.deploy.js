const hre = require('hardhat');

async function main() {
  const _2023Coin = await hre.ethers.getContractFactory('_2023Coin');
  const _2023CoinInstance = await _2023Coin.deploy();
  await _2023CoinInstance.deployed();
  console.log(`2023 Coin deployed at ${_2023CoinInstance.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0x4C61d50e80E168Da836D19bac1FbF3a2A783AaBD#code
// Testnet Contract: https://testnet.bscscan.com/address/0x34ecC6bEA48dF3487729fD05d6a87BeA90ed4971#code

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
