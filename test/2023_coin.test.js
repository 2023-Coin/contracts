const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('_2023Coin', () => {
  let _2023Coin;

  before(async () => {
    _2023Coin = await ethers.getContractFactory('_2023Coin');
    _2023CoinInstance = await _2023Coin.deploy();
    await _2023CoinInstance.deployed();
    console.log(`2023 Coin deployed at ${_2023CoinInstance.address}`);
  });

  it('Should...', async () => {
    //
  });
});
