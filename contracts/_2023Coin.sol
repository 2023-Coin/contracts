// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract _2023Coin is ERC20, Ownable {
  /// @notice The max supply of the 2023 Coin (100 million tokens)
  uint256 public constant MAX_SUPPLY = 1000000000 * 1e18;

  /// @notice Constructor
  constructor() ERC20("2023 Coin", "2023") {
    _mint(msg.sender, MAX_SUPPLY);
  }

  /**
   * @notice Burns tokens from the balance of the sender
   * @param _amount uint256 The amount of tokens to burn
   * @dev Reverts if the sender doesn't have enough balance
   */
  function burn(uint256 _amount) external {
    require(balanceOf(msg.sender) >= _amount, "_2023Coin: Insufficient token balance.");

    _burn(msg.sender, _amount);
  }

  /**
   * @notice Added to support recovering ether trapped in the contract
   * @dev Only owner can call it
   */
  function recoverEther() external onlyOwner {
    (bool sent, ) = owner().call{value: address(this).balance}("");
    require(sent, "_2023Coin: Couldn't send ether to you.");
  }

  /**
   * @notice Added to support recovering ERC20 tokens trapped in the contract
   * @param _tokenAddress address
   * @dev Only owner can call it and token address is not address(0)
   */
  function recoverERC20(address _tokenAddress) external onlyOwner {
    require(_tokenAddress != address(0), "_2023Coin: Invalid token address.");
    
    bool sent = IERC20(_tokenAddress).transfer(owner(), IERC20(_tokenAddress).balanceOf(address(this)));
    require(sent, "_2023Coin: Couldn't send ERC20 tokens to you.");
  }
}
