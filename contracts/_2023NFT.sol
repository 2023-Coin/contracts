// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract _2023NFT is ERC721, Ownable {
  /// @notice OpenZeppelin libraries
  using Counters for Counters.Counter;

  /// @notice The ID of the next 2023 NFT to be minted
  Counters.Counter public nftId;

  /// @notice The max supply of the 2023 NFT (2023 NFTs)
  uint256 public constant MAX_SUPPLY = 2023;

  /// @notice The mint price of the 2023 NFT (0.2023 BNB)
  uint256 public constant MINT_PRICE = 202300000000000000;

  /// @notice The recipient of all mint fees (dev team's wallet)
  address public immutable mintFeeRecipient;
  
  /// @notice The mapping from the address to whether it is whitelisted to mint a 2023 NFT or not
  mapping(address => bool) public isWhitelisted;

  /**
   * @notice Constructor
   * @param _mintFeeRecipient address
   * @dev The nftId counter gets set to 1, so there's no NFT with the ID of 0
   */
  constructor(address _mintFeeRecipient) ERC721("2023 NFT", "2023") {
    mintFeeRecipient = _mintFeeRecipient;
    nftId.increment();
  }

  /**
   * @notice Mints a new 2023 NFT and assigns the next available ID to it
   * @dev Each user can only mint 1 NFT and needs to pay the correct mint fee
   */
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

  /**
   * @notice Burns the NFT of the given ID
   * @param _tokenId uint256 
   * @dev Reverts if the sender doesn't own the NFT
  */
  function burn(uint256 _tokenId) external {
    require(msg.sender == ownerOf(_tokenId), "_2023NFT: You do not own this token.");
    _burn(_tokenId);
  }

  /**
   * @notice Adds the array of addresses to the whitelist
   * @param _minters address[] memory
   * @dev Only owner can call it and there must be at least 1 address in the array
   */
  function addToWhitelist(address[] memory _minters) external onlyOwner {
    require(_minters.length > 0, "_2023NFT: Must add at least 1 address to whitelist.");

    for (uint256 i = 0; i < _minters.length; i++) {
      require(_minters[i] != address(0), "_2023NFT: Cannot add zero address to the whitelist.");
      require(!isWhitelisted[_minters[i]], "_2023NFT: Address is already included in the whitelist.");

      isWhitelisted[_minters[i]] = true;
    }
  }

  /**
   * @notice Returns the internal (only for use inside the contract) version of the base URI for the NFT metadata
   * @return string memory
   */
  function _baseURI() internal pure override returns (string memory) {
    return "https://2023coin.club/nft_id/";
  }

  /**
   * @notice Returns the external (publicly available) version of the base URI for the NFT metadata
   * @return string memory
   */
  function baseURI() external pure returns (string memory) {
    return "https://2023coin.club/nft_id/";
  }

  /**
   * @notice Returns the contract-level metadata for the 2023 NFT
   * @return string memory
   */
  function contractURI() external pure returns (string memory) {
    return "https://2023coin.club/2023_nft";
  }
}
