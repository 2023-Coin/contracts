const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('_2023Coin', () => {
  let _2023Coin, _2023CoinInstance, maxSupply, deployer;

  before(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    maxSupply = '1000000000.0';

    _2023Coin = await ethers.getContractFactory('_2023Coin');
    _2023CoinInstance = await _2023Coin.deploy();
    await _2023CoinInstance.deployed();
    console.log(`2023 Coin deployed at ${_2023CoinInstance.address}`);
  });

  it('Should verify the max supply', async () => {
    const supply = await _2023CoinInstance.MAX_SUPPLY();
    expect(ethers.utils.formatEther(supply.toString())).to.equal(maxSupply);
  });

  it('Should check the balance of the contract deployer', async () => {
    const balance = await _2023CoinInstance.balanceOf(deployer.address);
    expect(ethers.utils.formatEther(balance.toString())).to.equal(maxSupply);
  });

  it('Should burn the 1 million tokens from the deployer and check the new total supply afterwards', async () => {
    const amount = ethers.utils.parseEther('1000000');
    await _2023CoinInstance.burn(amount);
    const supply = await _2023CoinInstance.totalSupply();
    expect('999000000.0').to.equal(ethers.utils.formatEther(supply.toString()));
  });
});
