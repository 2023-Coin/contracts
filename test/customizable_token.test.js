const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CustomizableToken', () => {
  let CustomizableToken, customizableToken, maxSupply, deployer;

  before(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    maxSupply = '1000000000.0';

    CustomizableToken = await ethers.getContractFactory('CustomizableToken');
    customizableToken = await CustomizableToken.deploy();
    await customizableToken.deployed();
    console.log(`Customizable Token deployed at ${customizableToken.address}`);
  });

  it('Should verify the max supply', async () => {
    const supply = await customizableToken.MAX_SUPPLY();
    expect(ethers.utils.formatEther(supply.toString())).to.equal(maxSupply);
  });

  it('Should check the balance of the contract deployer', async () => {
    const balance = await customizableToken.balanceOf(deployer.address);
    expect(ethers.utils.formatEther(balance.toString())).to.equal(maxSupply);
  });

  it('Should burn the 1 million tokens from the deployer and check the new total supply afterwards', async () => {
    const amount = ethers.utils.parseEther('1000000');
    await customizableToken.burn(amount);
    const supply = await customizableToken.totalSupply();
    expect('999000000.0').to.equal(ethers.utils.formatEther(supply.toString()));
  });

  it("Should change the token's name", async () => {
    const oldName = await customizableToken.name();
    expect(oldName).to.equal('Token');
    await customizableToken.changeName('New Token');
    const newName = await customizableToken.name();
    expect(newName).to.equal('New Token');
  });

  it("Should change the token's symbol", async () => {
    const oldSymbol = await customizableToken.symbol();
    expect(oldSymbol).to.equal('TKN');
    await customizableToken.changeSymbol('NEW');
    const newSymbol = await customizableToken.symbol();
    expect(newSymbol).to.equal('NEW');
  });
});
