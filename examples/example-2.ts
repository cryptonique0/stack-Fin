// Example 2: Update profile

import {
	makeContractCall,
	broadcastTransaction,
	stringAsciiCV,
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function updateProfile() {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey) {
		throw new Error('PRIVATE_KEY missing');
	}

	const network = process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;
	const contractAddress = process.env.CONTRACT_ADDRESS || 'SPXXXX...';

	const tx = await makeContractCall({
		contractAddress,
		contractName: 'identity-provider-v1',
		functionName: 'update-profile',
		functionArgs: [
			stringAsciiCV('alice'),
			stringAsciiCV('Builder on Stacks'),
			stringAsciiCV('https://example.com/avatar.png'),
		],
		senderKey: privateKey,
		network,
	});

	const result = await broadcastTransaction({ transaction: tx, network });
	console.log(result);
}

updateProfile().catch((err) => {
	console.error(err);
	process.exit(1);
});
