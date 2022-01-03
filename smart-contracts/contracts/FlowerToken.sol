//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IFlowerToken.sol";

contract FlowerToken is ERC721, IFlowerToken, Ownable {

    struct Flower {
        uint dna;
    }

    address private seedTokenAddress;
    uint256 private modulus = 100000000;
    
    Flower[] public flowers;    

    constructor() ERC721("FlowerToken", "FLTN") { }

    event FlowerPlanted(address, uint256);
    event DebugEvent(address, address);

    modifier onlySeedToken () {
        require(msg.sender == seedTokenAddress);
        _;
    }

    function setSeedTokenAddress(address _seedTokenAddress) external onlyOwner { 
        seedTokenAddress = _seedTokenAddress;
    }

    function plant(address _tokenOwner) external onlySeedToken {
        Flower memory flower = Flower(getRandomDna(_tokenOwner));
        
        flowers.push(flower);
        uint256 flowerId = flowers.length - 1;
        super._safeMint(_tokenOwner, flowerId);
        emit FlowerPlanted(msg.sender, flowerId);
    }

    function getRandomDna(address _tokenOwner) private view returns(uint256) {
        uint256 dna = uint256(keccak256(abi.encodePacked(block.timestamp, _tokenOwner))) % modulus;
        return dna;
    }

    function getAllFlowers(address _tokenOwner) external view returns(uint[] memory){
        uint totalTokens = balanceOf(_tokenOwner);
        uint[] memory tokenIds = new uint[](totalTokens);

        uint counter = 0;
        for(uint flowerId = 0; flowerId < flowers.length; flowerId++){
            if (ownerOf(flowerId) == _tokenOwner) {
                tokenIds[counter] = flowerId;
                counter++;
            }

            if (counter >= totalTokens){
                break;
            }
        }

        return tokenIds;
    }

    function kill() external onlyOwner {
        selfdestruct(payable(msg.sender));
    }
}