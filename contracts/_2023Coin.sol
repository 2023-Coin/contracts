// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract _2023Coin is ERC20 {
  uint256 public constant MAX_SUPPLY = 1000000000 * 1e18;

  constructor() ERC20("2023 Coin", "2023") {
    _mint(msg.sender, MAX_SUPPLY);
  }

  function burn(uint256 _amount) external {
    require(balanceOf(msg.sender) >= _amount, "_2023Coin: Insufficient token balance.");
    _burn(msg.sender, _amount);
  }
}
