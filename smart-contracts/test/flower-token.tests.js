const FlowerToken = artifacts.require("FlowerToken");
const SeedToken = artifacts.require("SeedToken");
const testUtils = require('./test.utils.js');

contract("FlowerToken", async accounts => {

    const owner = accounts[0];
    const gardener = accounts[1];
    const nonOwner = accounts[2];

    async function initReferences() {
        await flowerToken.setSeedTokenAddress(seedToken.address, {from: owner})
        await seedToken.setFlowerTokenInstance(flowerToken.address, {from: owner});
    }

    beforeEach(async () => {
        seedToken = await SeedToken.new()
        flowerToken = await FlowerToken.new();
    })

    afterEach(async () => {
        await seedToken.kill({from: owner});
        await flowerToken.kill({from: owner});
    })
 
    it ("should set seed token address from owner", async () => {
        await flowerToken.setSeedTokenAddress(seedToken.address, {from: owner});
    })

    it ("should fail set seed token address for non-owner", async () => {
        await testUtils.shouldThrow(flowerToken.setSeedTokenAddress(seedToken.address, {from: nonOwner}));
    })

    it ("should plant and get 2 flower ids for gardener", async () => {
        await initReferences();
        await seedToken.shareSeeds(gardener, 2, {from: owner});
        await seedToken.plantSeed({from: gardener});
        await seedToken.plantSeed({from: gardener});

        const flowerIds = await flowerToken.getAllFlowers(gardener);
        assert(flowerIds.length === 2, "Did not return array with 2 flower ids");
    })
    
})