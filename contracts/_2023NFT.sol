// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract _2023NFT is ERC721, Ownable {
  /// @notice OpenZeppelin libraries
  using Counters for Counters.Counter;

  /// @notice The ID of the next 2023 NFT to be minted
  Counters.Counter public nftId;

  /// @notice The max supply of the 2023 NFT (2023 NFTs)
  uint256 public constant MAX_SUPPLY = 2023;

  /// @notice The total number of 2023 NFTs that have been minted and not burned
  uint256 public totalSupply;

  /// @notice The mint price of the 2023 NFT (0.2023 BNB)
  uint256 public constant MINT_PRICE = 202300000000000000;

  /// @notice The recipient of all mint fees (dev team's wallet)
  address public immutable mintFeeRecipient;

  /// @notice The boolean indicating whether the minting is currently active or not
  bool public isMintingEnabled;
  
  /// @notice The mapping from the address to whether it is whitelisted to mint a 2023 NFT or not
  mapping(address => bool) public isWhitelisted;

  /**
   * @notice Constructor
   * @dev The nftId counter gets set to 1, so there's no NFT with the ID of 0
   */
  constructor() ERC721("2023 NFT", "2023") {
    mintFeeRecipient = msg.sender;
    nftId.increment();
  }

  receive() external payable {}

  /**
   * @notice Mints a new 2023 NFT and assigns the next available ID to it, increasing the totalSupply
   * @dev Each user can only mint 1 NFT and needs to pay the correct mint fee
   */
  function mint() external payable {
    require(isMintingEnabled, "_2023NFT: Minting is currently not live. Please try again later.");
    require(isWhitelisted[msg.sender], "_2023NFT: Not whitelisted to mint the 2023 NFT.");
    require(nftId.current() <= MAX_SUPPLY, "_2023NFT: All 2023 NFTs have been minted.");
    require(msg.value == MINT_PRICE, "_2023NFT: Must send the correct mint fee.");

    isWhitelisted[msg.sender] = false;

    (bool sent, ) = mintFeeRecipient.call{value: msg.value}("");
    require(sent, "_2023NFT: Failed to send ether to the mint fee recipient.");

    totalSupply += 1;
    _mint(msg.sender, nftId.current());

    nftId.increment();
  }

  /**
   * @notice Burns the NFT of the given ID and decreases the totalSupply
   * @param _tokenId uint256 
   * @dev Reverts if the sender doesn't own the NFT
  */
  function burn(uint256 _tokenId) external {
    require(msg.sender == ownerOf(_tokenId), "_2023NFT: You do not own this token.");

    totalSupply -= 1;
    _burn(_tokenId);
  }

  /**
   * @notice Adds the array of addresses to the whitelist
   * @param _minters address[] memory
   * @dev There must be at least 1 address in the array
   */
  function addToWhitelist(address[] memory _minters) external {
    require(_minters.length > 0, "_2023NFT: Must add at least 1 address to whitelist.");

    for (uint256 i = 0; i < _minters.length; i++) {
      require(_minters[i] != address(0), "_2023NFT: Cannot add zero address to the whitelist.");
      require(!isWhitelisted[_minters[i]], "_2023NFT: Address is already included in the whitelist.");

      isWhitelisted[_minters[i]] = true;
    }
  }

  /**
   * @notice Enables the minting of 2023 NFTs
   * @dev Only owner can call it and it can be only be called once
   */
  function enableMinting() external onlyOwner {
    require(!isMintingEnabled, "_2023NFT: Minting is already enabled.");

    isMintingEnabled = true;
  }

  /**
   * @notice Returns the internal (only for use inside the contract) version of the base URI for the NFT metadata
   * @return string memory
   */
  function _baseURI() internal pure override returns (string memory) {
    return "https://2023coin.club/2023_nft.html?id=";
  }

  /**
   * @notice Returns the external (publicly available) version of the base URI for the NFT metadata
   * @return string memory
   */
  function baseURI() external pure returns (string memory) {
    return "https://2023coin.club/2023_nft.html?id=";
  }

  /**
   * @notice Returns the contract-level metadata for the 2023 NFT
   * @return string memory
   */
  function contractURI() external pure returns (string memory) {
    return "https://2023coin.club/2023_nft.html";
  }

  /**
   * @notice Added to support recovering ether trapped in the contract
   * @dev Only owner can call it
   */
  function recoverEther() external onlyOwner {
    (bool sent, ) = owner().call{value: address(this).balance}("");
    require(sent, "_2023NFT: Couldn't send ether to you.");
  }

  /**
   * @notice Added to support recovering ERC20 tokens trapped in the contract
   * @param _tokenAddress address
   * @dev Only owner can call it and token address is not address(0)
   */
  function recoverERC20(address _tokenAddress) external onlyOwner {
    require(_tokenAddress != address(0), "_2023NFT: Invalid token address.");

    bool sent = IERC20(_tokenAddress).transfer(owner(), IERC20(_tokenAddress).balanceOf(address(this)));
    require(sent, "_2023NFT: Couldn't send ERC20 tokens to you.");
  }
}
