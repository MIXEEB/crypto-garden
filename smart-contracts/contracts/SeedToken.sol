//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ISeedToken.sol";
import "./IFlowerToken.sol";

contract SeedToken is ERC20, Ownable, ISeedToken {
    
    IFlowerToken private flowerTokenInstance;
    
    event SharedSeeds(address, uint256);
    event FlowerTokenSet(address);

    constructor() ERC20("SeedToken", "SDTN") { }
    function setFlowerTokenInstance(address _flowerTokenAddress) external onlyOwner { 
        flowerTokenInstance = IFlowerToken(_flowerTokenAddress);
        emit FlowerTokenSet(_flowerTokenAddress);
    }

    function shareSeeds(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
        emit SharedSeeds(account, amount);
    }

    function plantSeed() external {
        require(super.balanceOf(msg.sender) > 0, "You don't have enough seeds to plant a flower");
        super._burn(msg.sender, 1);
        
        flowerTokenInstance.plant(msg.sender);
    }

    function kill() external onlyOwner {
        selfdestruct(payable(msg.sender));
    }
}