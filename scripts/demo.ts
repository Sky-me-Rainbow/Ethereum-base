import 'dotenv/config';
import { getLatestBlockNumber, getEthBalance, getUsdtBalance } from '../src/web3';

async function main() {
	const address = process.env.ADDRESS || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
	// if (!address) {
	// 	throw new Error('Missing Wallet address. Set ADDRESS in .env');
	// }

	const block = await getLatestBlockNumber();
	console.log('Latest block:', block);

	const eth = await getEthBalance(address!);
	console.log('ETH balance:', eth);

	const usdt = await getUsdtBalance(address!);
	console.log('USDT balance:', usdt);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
}); 