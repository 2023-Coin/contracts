const hre = require('hardhat');

const mintFeeRecipient = '0x0000000000000000000000000000000000000000';

async function main() {
  const _2023NFT = await hre.ethers.getContractFactory('_2023NFT');
  const _2023NFTInstance = await _2023NFT.deploy(mintFeeRecipient);
  await _2023NFTInstance.deployed();
  console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
