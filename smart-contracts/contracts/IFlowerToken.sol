//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

interface IFlowerToken {
    function plant(address _tokenOwner) external;
    function setSeedTokenAddress(address _seedTokenAddress) external;
    function getAllFlowers(address _tokenOwner) external view returns(uint[] memory);
}