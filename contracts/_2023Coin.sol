// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract _2023Coin is ERC20 {
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
}
