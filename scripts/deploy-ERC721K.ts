import { ethers } from 'hardhat';
// eslint-disable-next-line camelcase
import { ERC721K__factory, ERC721K, MinimalForwarder__factory, MinimalForwarder } from '../typechain-types';

async function main() {
    const [admin] = await ethers.getSigners();

    // deployContract
    const MinimalForwarderFactory = new MinimalForwarder__factory(admin);
    const MinimalForwarderContract: MinimalForwarder = await MinimalForwarderFactory.deploy();

    // // eslint-disable-next-line no-console
    console.log('MinimalForwarder deployed to:', MinimalForwarderContract.address);

    // deployContract
    const ERC721KFactory = new ERC721K__factory(admin);
    const ERC721KContract: ERC721K = await ERC721KFactory.deploy(MinimalForwarderContract.address);

    // eslint-disable-next-line no-console
    console.log('ERC721K deployed to:', ERC721KContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        process.exit(1);
    });
