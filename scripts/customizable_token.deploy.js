const hre = require('hardhat');

async function main() {
  const CustomizableToken = await hre.ethers.getContractFactory(
    'CustomizableToken'
  );
  const customizableToken = await CustomizableToken.deploy();
  await customizableToken.deployed();
  console.log(`Customizable Token deployed at ${customizableToken.address}`);
}

// Mainnet Contract: https://bscscan.com/address/0x#code
// Testnet Contract: https://testnet.bscscan.com/address/0xB3910E96071d45d3d86B3759c7572BDf9e81dE33#code

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
