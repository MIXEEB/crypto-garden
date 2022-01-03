//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface ISeedToken {
    function plantSeed() external;
    function setFlowerTokenInstance(address _flowerTokenAddress) external;
    function shareSeeds(address account, uint256 amount) external;
}