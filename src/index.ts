import { ethers, providers } from 'ethers';
import hre from 'hardhat';

// const mint = async ({
//     contractAddress,
//     data,
//     rpc,
//     network,
// }:RequestBodyMint) => {
//     // generate contract instance & signer
//     const { contract, signer } = await getContractAndSigner(rpc, contractAddress);

//     // reccomendGas
//     const { maxFeePerGas, maxPriorityFeePerGas } = await recommendGas(network);
//     // const gasPrice = await contract.estimateGas.mint(data);
//     const val = 120
//     const gasPrice = ethers.utils.parseUnits(val.toFixed(9).toString(), 'gwei');
//     logger.info(
//     `[Mint] gasPrice: ${gasPrice.toNumber()}, maxFeePerGas: ${
//         maxFeePerGas?.toNumber
//     }, maxPriorityFeePerGas: ${maxPriorityFeePerGas?.toNumber()}`,
//     );

//     const nonce = await signer.getTransactionCount();

//     const overrides: ethers.Overrides = {
//     nonce,
//     type: gasPrice ? 0 : 2,
//     gasPrice,
//     };
//     if (!gasPrice) {
//     overrides.maxFeePerGas = maxFeePerGas;
//     overrides.maxPriorityFeePerGas = maxPriorityFeePerGas;
//     }
//     // Populate transaction
//     // const tokenDestinations = data;
//     // const txRequest = await contract.populateTransaction.mint(
//     // tokenDestinations,
//     // overrides,
//     // );

//     // Check the balance of owner wallet before executing transaction
//     // await checkOwnerBalance(signer, txRequest);

//     // Execute transaction
//     // logger.info(`send mint tx: ${JSON.stringify(txRequest)}`);
//     // const receipt = await signer.sendTransaction(txRequest);
//     // return receipt.hash;
// }



// providers, signer 練習
const main = async () => {
    const network = 'hardhat-chain'
    const rpc = getRPC(network)
    const signer = await getContractAndSigner(rpc);

    others()
}

const others = () => {
    const overrides: ethers.Overrides = {
        // nonce,
        // type: gasPrice ? 0 : 2,
        // gasPrice,
    };
    console.log("overrides:", overrides)
}

// const getContractAndSigner = async (
//     rpc: string,
//     contractAddress: string,
// ) =>  {
const getContractAndSigner = async (
    rpc: string,
) =>  {
    const eprovider = new ethers.providers.EtherscanProvider
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const signer = await getSigner(provider);
    // const contract = ...

    // typechain: https://tech.mobilefactory.jp/entry/2019/12/04/163000
    // const contract = YoaniERC721HWithMetaTx__factory.connect(
    //     contractAddress,
    //     signer,
    // );

    // return {contract, signer}
    return signer
}

const getSigner = async (provider: ethers.providers.JsonRpcProvider) => {
    try {
        const signers = await hre.ethers.getSigners();
        return signers[0];
    } catch (error) {
        const privKey = '';
        const signer = new ethers.Wallet(privKey, provider);
        return signer;
    }
};



export const networks = [
    'polygon-mainnet',
    'polygon-mumbai',
    'goerli',
    'hardhat-chain',
] as const;

export type TargetNetwork = typeof networks[number];

export const getRPC = (network: TargetNetwork) => {
    let rpc;
    switch (network) {
        case 'hardhat-chain':
            // rpc = process.env.HARDHAT_CHAIN_RPC;
            rpc = "http://127.0.0.1:8545";
            if (!rpc) throw new Error('HARD_HAT_CHAIN not set in env');
            return rpc;
        default:
            throw new Error('invalid network');
    }
};

main()