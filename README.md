# README.md

## Ethereum helpers (ethers v6)

### Install
- Node.js 18+ recommended
- Run:

```bash
npm install
```

### RPC configuration (optional)
- Default provider falls back to `https://cloudflare-eth.com` (public, rate‑limited)
- To use your own RPC (recommended), set one of:
  - `ETH_RPC_URL` (preferred)
  - `ALCHEMY_HTTP_URL`
  - `INFURA_HTTP_URL`

PowerShell (current session):
```powershell
$env:ETH_RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
```

### Demo script
- Run with an address argument (defaults to a known address if omitted):

```bash
npm run demo -- 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

### API (TypeScript)
- `getLatestBlockNumber(): Promise<number>`
- `getEthBalance(address: string): Promise<string>`
- `getUsdtBalance(address: string, tokenAddress?: string): Promise<string>`

Example:
```ts
import { getLatestBlockNumber, getEthBalance, getUsdtBalance } from './src/web3';

const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

await getLatestBlockNumber();
await getEthBalance(address);
await getUsdtBalance(address); // defaults to mainnet USDT
```

Notes:
- USDT default token address is mainnet: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- Balances are returned as human‑readable strings (`ETH` and token units)
