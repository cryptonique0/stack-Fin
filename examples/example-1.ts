// Example 1: Read profile

import { callReadOnlyFunction, cvToValue, principalCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function readProfile() {
	const network = process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

	const contractAddress = process.env.CONTRACT_ADDRESS || 'SPXXXX...';
	const senderAddress = process.env.SENDER_ADDRESS || 'SPXXXX...';
	const user = process.env.PROFILE_USER || senderAddress;

	const result = await callReadOnlyFunction({
		contractAddress,
		contractName: 'identity-provider-v1',
		functionName: 'get-profile',
		functionArgs: [principalCV(user)],
		senderAddress,
		network,
	});

	console.log(cvToValue(result));
}

readProfile().catch((err) => {
	console.error(err);
	process.exit(1);
});
