const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('_2023NFT', () => {
  let _2023NFT,
    contractURI,
    baseURI,
    maxSupply,
    mintPrice,
    accounts,
    deployer,
    user1,
    user2;

  before(async () => {
    accounts = await ethers.getSigners();

    contractURI = 'https://2023coin.club/2023_nft.html';
    baseURI = 'https://2023coin.club/2023_nft.html?id=';
    maxSupply = 2023;
    mintPrice = ethers.utils.parseEther('0.2023');
    deployer = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];

    _2023NFT = await ethers.getContractFactory('_2023NFT');
    _2023NFTInstance = await _2023NFT.deploy();
    await _2023NFTInstance.deployed();
    console.log(`2023 NFT deployed at ${_2023NFTInstance.address}`);
  });

  it('Should verify the max supply', async () => {
    const supply = await _2023NFTInstance.MAX_SUPPLY();
    expect(supply.toNumber()).to.equal(maxSupply);
  });

  it('Should verify the mint price', async () => {
    const price = await _2023NFTInstance.MINT_PRICE();
    expect(ethers.utils.formatEther(price).toString()).to.equal(
      ethers.utils.formatEther(mintPrice).toString()
    );
  });

  it('Should check the mint fee recipient', async () => {
    const feeRecipient = await _2023NFTInstance.mintFeeRecipient();
    expect(feeRecipient).to.equal(deployer.address);
  });

  it('Should check that the initial nftId is set to 1', async () => {
    const nftId = await _2023NFTInstance.nftId();
    expect(nftId.toNumber()).to.equal(1);
  });

  it('Should add 3 user addresses to the whitelist', async () => {
    await _2023NFTInstance.addToWhitelist([
      deployer.address,
      user1.address,
      user2.address,
    ]);
  });

  it('Should check that all 3 addresses have been added to the whitelist', async () => {
    const whitelisted1 = await _2023NFTInstance.isWhitelisted(deployer.address);
    expect(whitelisted1).to.equal(true);
    const whitelisted2 = await _2023NFTInstance.isWhitelisted(user1.address);
    expect(whitelisted2).to.equal(true);
    const whitelisted3 = await _2023NFTInstance.isWhitelisted(user2.address);
    expect(whitelisted3).to.equal(true);
  });

  it('Should enable minting', async () => {
    const isMintingEnabled = await _2023NFTInstance.isMintingEnabled();
    expect(isMintingEnabled).to.equal(false);
    await _2023NFTInstance.enableMinting();
    const isMintingEnabled2 = await _2023NFTInstance.isMintingEnabled();
    expect(isMintingEnabled2).to.equal(true);
  });

  it('Should mint 3 NFTs - 1 for each of the whitelisted users', async () => {
    const totalSupplyBefore = await _2023NFTInstance.totalSupply();
    expect(totalSupplyBefore.toNumber()).to.equal(0);
    await _2023NFTInstance.mint({ value: mintPrice });
    const nftId = await _2023NFTInstance.nftId();
    expect(nftId.toNumber()).to.equal(2);
    await _2023NFTInstance.connect(user1).mint({ value: mintPrice });
    const nftId2 = await _2023NFTInstance.nftId();
    expect(nftId2.toNumber()).to.equal(3);
    await _2023NFTInstance.connect(user2).mint({ value: mintPrice });
    const nftId3 = await _2023NFTInstance.nftId();
    expect(nftId3.toNumber()).to.equal(4);
    const totalSupplyAfter = await _2023NFTInstance.totalSupply();
    expect(totalSupplyAfter.toNumber()).to.equal(3);
  });

  it('Should burn the NFT of the ID of 1', async () => {
    const totalSupplyBefore = await _2023NFTInstance.totalSupply();
    expect(totalSupplyBefore.toNumber()).to.equal(3);
    await _2023NFTInstance.burn(1);
    const balanceAfterBurn = await _2023NFTInstance.balanceOf(deployer.address);
    expect(balanceAfterBurn.toNumber()).to.equal(0);
    const totalSupplyAfter = await _2023NFTInstance.totalSupply();
    expect(totalSupplyAfter.toNumber()).to.equal(2);
  });

  it('Should verify the contractURI', async () => {
    const _contractURI = await _2023NFTInstance.contractURI();
    expect(_contractURI).to.equal(contractURI);
  });

  it('Should verify the baseURI', async () => {
    const _baseURI = await _2023NFTInstance.baseURI();
    expect(_baseURI).to.equal(baseURI);
  });

  it('Should get the tokenURI for the NFT of the ID of 2', async () => {
    const tokenURI = await _2023NFTInstance.tokenURI(2);
    expect(tokenURI).to.equal(baseURI + '2');
  });
});
