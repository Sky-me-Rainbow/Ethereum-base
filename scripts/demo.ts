import 'dotenv/config';
import * as web3 from '../src/web3';
import { ethers } from 'ethers';

async function main() {
	const address = process.env.WALLET_ADDRESS || '0x172751a853373bC6d6593a9f6a68a39aF46eBBd9';
	const private_key = process.env.PRIVATE_KEY || 'd6f34ea9b6be147038f7cc2311cb05fd1e760d12c3850307429bd45d2bc3376a';
	const to = '0x2f8A471A72B33c8A68c4445d7A002891136330C7'
	// if (!address) {
	// 	throw new Error('Missing Wallet address. Set WALLET_ADDRESS in .env');
	// }

	const block = await web3.getLatestBlockNumber();
	console.log('Latest block:', block);

	const eth = await web3.getEthBalance(address!);
	console.log('ETH balance:', eth);

	const specific_token = await web3.getSpecificTokenBalance(address!);
	console.log('IJS balance:', specific_token);

	const tx1 = await web3.sendETH(private_key, to, '0.00001');
	console.log('token:', 'ETH', 'from:', tx1.from , 'to:', tx1.to, 'value:', ethers.formatEther(tx1.value));

	const tx2 = await web3.sendSpecificToken(private_key, to, '10');
	// console.log('tx2:', tx2);
	console.log('token:', 'IJS', 'from:', tx2.from , 'to:', tx2.to, 'value:', ethers.formatUnits(tx2.value, 18));
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
}); 