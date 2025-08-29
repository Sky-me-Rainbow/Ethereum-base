import { ethers } from 'ethers';

const USDT_MAINNET_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const ERC20_ABI = [
	// balanceOf(address)
	'function balanceOf(address owner) view returns (uint256)',
	// decimals() may be needed to format, but USDT is 6 on mainnet
	'function decimals() view returns (uint8)'
];

function getProvider(): ethers.JsonRpcProvider {
	const rpcUrl = process.env.ETH_RPC_URL;
	if (!rpcUrl) {
		throw new Error('Missing RPC URL. Set ETH_RPC_URL in .env');
	}
	return new ethers.JsonRpcProvider(rpcUrl);
}

export async function getLatestBlockNumber(): Promise<number> {
	const provider = getProvider();
	const blockNumber = await provider.getBlockNumber();
	return blockNumber;
}

export async function getEthBalance(address: string): Promise<string> {
	const provider = getProvider();
	const balanceWei = await provider.getBalance(address);
	return ethers.formatEther(balanceWei);
}

export async function getUsdtBalance(address: string, tokenAddress: string = USDT_MAINNET_ADDRESS): Promise<string> {
	const provider = getProvider();
	const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
	const [raw, decimals] = await Promise.all([
		erc20.balanceOf(address) as Promise<bigint>,
		erc20.decimals() as Promise<number>
	]);
	return ethers.formatUnits(raw, decimals);
} 