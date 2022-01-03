const SeedToken = artifacts.require("SeedToken");
const FlowerToken = artifacts.require("FlowerToken");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SeedToken, { from: accounts });
  deployer.deploy(FlowerToken, { from: accounts });
};
