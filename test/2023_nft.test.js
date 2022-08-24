const { expect } = require('chai');
const { ethers } = require('hardhat');

const mintFeeRecipient = '0x0000000000000000000000000000000000000000';

describe('_2023NFT', () => {
  let _2023NFT;

  before(async () => {
    _2023NFT = await ethers.getContractFactory('_2023NFT');
    _2023NFTInstance = await _2023NFT.deploy(mintFeeRecipient);
    await _2023NFTInstance.deployed();
    console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
  });

  it('Should...', async () => {
    //
  });
});
