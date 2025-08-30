import { ethers } from 'ethers';

const USDT_MINT_ADDRESS = process.env.USDT_MINT_ADDRESS || '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const IJS_MINT_ADDRESS = process.env.IJS_MINT_ADDRESS || '0x3285F997da271fccf95337E192c8FAE15D22023e';

const ERC20_ABI = [
	// balanceOf(address)
	'function balanceOf(address owner) view returns (uint256)',
	// decimals() may be needed to format, but USDT is 6 on mainnet
	'function decimals() view returns (uint8)',
	// transfer(address,uint256)
	'function transfer(address to, uint256 amount) returns (bool)'
];

function getProvider(): ethers.JsonRpcProvider {
	const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL;
	// if (!rpcUrl) {
	// 	throw new Error('Missing RPC URL. Set ETH_RPC_URL in .env');
	// }
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

export async function getSpecificTokenBalance(address: string, tokenAddress: string = IJS_MINT_ADDRESS): Promise<string> {
	const provider = getProvider();
	const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
	const [raw, decimals] = await Promise.all([
		erc20.balanceOf(address) as Promise<bigint>,
		erc20.decimals() as Promise<number>
	]);
	return ethers.formatUnits(raw, decimals);
}

export async function sendETH(privateKey: string, to: string, amountEth: string) {
    const provider = getProvider();
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = await wallet.sendTransaction({ to, value: ethers.parseEther(amountEth) });
    return tx;
}

export async function sendSpecificToken(privateKey: string, to: string, amount: string, tokenAddress: string = IJS_MINT_ADDRESS) {
    const provider = getProvider();
    const wallet = new ethers.Wallet(privateKey, provider);
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
    // fetch decimals to convert amount
    const decimals: number = await erc20.decimals();
    const amountUnits = ethers.parseUnits(amount, decimals);
    const tx = await erc20.transfer(to, amountUnits);
    return tx;
} 