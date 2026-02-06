
import { 
  makeContractDeploy, 
  broadcastTransaction, 
} from '@stacks/transactions';
import { getStacksNetwork } from '../utils/stacks';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Env vars documented in .env.example
dotenv.config({ path: '.env' });

export function getNetwork() {
  return getStacksNetwork();
}

export function getDidDeployOptions(codeBody: string, senderKey: string) {
  const network = getNetwork();
  return {
    contractName: 'identity-provider-v1',
    codeBody,
    senderKey,
    network,
    anchorBlockOnly: true,
  };
}

async function deployDID() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("PRIVATE_KEY missing");
    return;
  }

  const contractPath = path.join(__dirname, '../contracts/identity-provider-v1.clar');
  const codeBody = fs.readFileSync(contractPath, 'utf8');

  const txOptions = getDidDeployOptions(codeBody, privateKey);
  const { network } = txOptions;

  try {
    const transaction = await makeContractDeploy(txOptions);
    const result = await broadcastTransaction({ transaction, network });
    console.log('Identity Provider V1 Broadcast:', result.txid);
  } catch (e) {
    console.error('Broadcast failed:', e);
  }
}

if (require.main === module) {
  deployDID();
}
