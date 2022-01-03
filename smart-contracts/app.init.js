const Web3 = require('web3');
let Contract = require('web3-eth-contract');
const seedToken = require('./build/contracts/SeedToken.json');
const flowerToken = require('./build/contracts/FlowerToken.json');
const providerUrl = "http://localhost:7545";
async function initApplication() {

    const web3 = new Web3(providerUrl);
    const accounts = await web3.eth.getAccounts();
    Contract.setProvider(providerUrl);

    const owner = accounts[0];
    const gardener = accounts[1];
    const sendOptions = {
        from: owner,
        gas: 6721975,
        gasPrice: '20000000000'
    }

    const seedTokenContract = new Contract(seedToken.abi);
    const seedTokenInstance = await seedTokenContract.deploy({ data: seedToken.bytecode }).send(sendOptions);
    const seedTokenAddress = seedTokenInstance._address;

    const flowerTokenContract = new Contract(flowerToken.abi);
    const flowerTokenInstance = await flowerTokenContract.deploy({ data: flowerToken.bytecode }).send(sendOptions)
    const flowerTokenAddress = flowerTokenInstance._address;

    await seedTokenInstance.methods.setFlowerTokenInstance(flowerTokenAddress).send(sendOptions);
    await flowerTokenInstance.methods.setSeedTokenAddress(seedTokenAddress).send(sendOptions);

    await seedTokenInstance.methods.shareSeeds(gardener, 100).send(sendOptions);
    
    const receipt = await seedTokenInstance.methods.balanceOf(gardener).call()    
    console.log({
        gardenerAddress: gardener,
        flowerTokenContract: flowerTokenAddress,
        seedTokenContract: seedTokenAddress
    });
}

(async () => await initApplication())();


