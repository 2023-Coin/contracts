const hre = require('hardhat');

const mintFeeRecipient = '0x2E7b6533641b120E88Bd9d97Aa2D7Fd0091Cf32e';

async function main() {
  const _2023NFT = await hre.ethers.getContractFactory('_2023NFT');
  const _2023NFTInstance = await _2023NFT.deploy(mintFeeRecipient);
  await _2023NFTInstance.deployed();
  console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0xB3910E96071d45d3d86B3759c7572BDf9e81dE33#code
// Testnet Contract: https://testnet.bscscan.com/address/0xB4479dE2D3C9b2963b1f38226729D8b7544eAfc9#code

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
