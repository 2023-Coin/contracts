// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract _2023NFT is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter public nftId;

  uint256 public constant MAX_SUPPLY = 2023;

  uint256 public constant MINT_PRICE = 202300000000000000;

  address public immutable mintFeeRecipient;

  mapping(address => bool) public isWhitelisted;

  constructor(address _mintFeeRecipient) ERC721("2023 NFT", "2023") {
    mintFeeRecipient = _mintFeeRecipient;
    nftId.increment();
  }

  function mint() external payable {
    require(isWhitelisted[msg.sender], "_2023NFT: Not whitelisted to mint the 2023 NFT.");
    require(nftId.current() <= MAX_SUPPLY, "_2023NFT: All 2023 NFTs have been minted.");
    require(msg.value == MINT_PRICE, "_2023NFT: Must send the correct mint fee.");

    isWhitelisted[msg.sender] = false;
    (bool sent, ) = mintFeeRecipient.call{value: msg.value}("");
    require(sent, "_2023NFT: Failed to send ether to the mint fee recipient.");
    _mint(msg.sender, nftId.current());
    nftId.increment();
  }

  function addToWhitelist(address[] memory _minters) external onlyOwner {
    require(_minters.length > 0, "_2023NFT: Must add at least 1 address to whitelist.");

    for (uint256 i = 0; i < _minters.length; i++) {
      require(_minters[i] != address(0), "_2023NFT: Cannot add zero address to the whitelist.");
      require(!isWhitelisted[_minters[i]], "_2023NFT: Address is already included in the whitelist.");

      isWhitelisted[_minters[i]] = true;
    }
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://2023coin.club/nft_id/";
  }

  function baseURI() external pure returns (string memory) {
    return "https://2023coin.club/nft_id/";
  }

  function contractURI() external pure returns (string memory) {
    return "https://2023coin.club/2023_nft";
  }
}
