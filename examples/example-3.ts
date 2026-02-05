// Example 3: Read reputation score

import { callReadOnlyFunction, cvToValue, principalCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function readReputationScore() {
	const network = process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;
	const contractAddress = process.env.CONTRACT_ADDRESS || 'SPXXXX...';
	const senderAddress = process.env.SENDER_ADDRESS || 'SPXXXX...';
	const user = process.env.SCORE_USER || senderAddress;

	const result = await callReadOnlyFunction({
		contractAddress,
		contractName: 'reputation-score-v1',
		functionName: 'get-score',
		functionArgs: [principalCV(user)],
		senderAddress,
		network,
	});

	console.log(cvToValue(result));
}

readReputationScore().catch((err) => {
	console.error(err);
	process.exit(1);
});
