const hre = require('hardhat');

async function main() {
  const _2023NFT = await hre.ethers.getContractFactory('_2023NFT');
  const _2023NFTInstance = await _2023NFT.deploy();
  await _2023NFTInstance.deployed();
  console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0x7121EbF9419c59Dc071e52D2c2fac2F288fFb45c#code
// Testnet Contract: https://testnet.bscscan.com/address/0x8AFB82FFf80F3946d2dF9789Dd71B922daFF0E56#code

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
