const FlowerToken = artifacts.require("FlowerToken");
const SeedToken = artifacts.require("SeedToken");
const testUtils = require('./test.utils.js');

contract("SeedToken", async accounts => {
    
    const owner = accounts[0];
    const gardener = accounts[1];
    const nonOwner = accounts[2];

    async function initReferences (){
    await flowerToken.setSeedTokenAddress(seedToken.address, {from: owner})
    await seedToken.setFlowerTokenInstance(flowerToken.address, {from: owner});
    }

    beforeEach(async () => {
        console.log("call index: " + indexBefore++);  
        seedToken = await SeedToken.new();
        flowerToken = await FlowerToken.new();
    })

    afterEach(async () => {
        await seedToken.kill({from: owner});
        await flowerToken.kill({from: owner});
    })
    
    it ("should set flower token instance from owner", async () => {
        await seedToken.setFlowerTokenInstance.call(flowerToken.address, {from: owner});
    })
    

    it ("should fail set flower token instance from non-owner", async () => {
        await testUtils.shouldThrow(seedToken.setFlowerTokenInstance.call(flowerToken.address, {from: nonOwner}));
    })

    it ("should plant flower and spend seed", async () => {
        await initReferences();
        await seedToken.shareSeeds(gardener, 1, {from: owner});

        let balance = await seedToken.balanceOf(gardener)
        assert(balance.words[0] === 1, "Gardener should have 1 seed");

        await seedToken.plantSeed({from: gardener});

        balance = await seedToken.balanceOf(gardener);
        assert(balance.words[0] === 0, "Gardener should have 0 seed");
    })

})