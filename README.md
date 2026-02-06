# Stacks DID - Decentralized Identity

Reputation and identity management on Stacks blockchain.

## Contracts

- `identity-provider-v1.clar` - Decentralized identity registry
- `reputation-score-v1.clar` - Reputation scoring system

## Mainnet

Deployed at `SP9AS5B36MKC0FVF4DE75A1EBPANXQ14AEH98BH0`

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Environment

Create a `.env` file in the project root with:

```env
PRIVATE_KEY=your_stacks_private_key
STACKS_NETWORK=testnet
```

Supported `STACKS_NETWORK` values: `testnet` or `mainnet`.

## Deploy

Deploy Identity Provider:

```bash
npm run deploy:did
```

Deploy Reputation Score:

```bash
npm run deploy:score
```

## SDK Usage

### Update Profile

```typescript
import { makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

const network = process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

const tx = await makeContractCall({
	contractAddress: 'SPXXXX...',
	contractName: 'identity-provider-v1',
	functionName: 'update-profile',
	functionArgs: [
		/* nickname */
		/* bio */
		/* avatar-url */
	],
	senderKey: process.env.PRIVATE_KEY as string,
	network,
});

const result = await broadcastTransaction({ transaction: tx, network });
console.log(result);
```

### Read Profile

```typescript
import { callReadOnlyFunction } from '@stacks/transactions';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

const network = process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

const profile = await callReadOnlyFunction({
	contractAddress: 'SPXXXX...',
	contractName: 'identity-provider-v1',
	functionName: 'get-profile',
	functionArgs: [/* principal */],
	senderAddress: 'SPXXXX...',
	network,
});

console.log(profile);
```

## Stacks SDK Bundle

All Stacks SDK packages are available via a single entry point:

```typescript
import { transactions, auth, storage, profile, encryption, walletSdk, connect, bns, apiClient, getStacksNetwork } from './utils/stacks';

const network = getStacksNetwork();
const tx = await transactions.makeContractCall({
	contractAddress: 'SPXXXX...',
	contractName: 'identity-provider-v1',
	functionName: 'update-profile',
	functionArgs: [],
	senderKey: process.env.PRIVATE_KEY as string,
	network,
});
```
