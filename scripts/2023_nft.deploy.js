const hre = require('hardhat');

const mintFeeRecipient = '0x2E7b6533641b120E88Bd9d97Aa2D7Fd0091Cf32e';

async function main() {
  const _2023NFT = await hre.ethers.getContractFactory('_2023NFT');
  const _2023NFTInstance = await _2023NFT.deploy(mintFeeRecipient);
  await _2023NFTInstance.deployed();
  console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0x#code
// Testnet Contract: https://testnet.bscscan.com/address/0xF59842400Cfb999A075F66eb0C4f10DAC81D8757#code
// npx hardhat verify 0xF59842400Cfb999A075F66eb0C4f10DAC81D8757 --network bsc_testnet --constructor-args scripts/args/2023_nft.arguments.js

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
