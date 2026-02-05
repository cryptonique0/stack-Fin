declare const process: { env: Record<string, string | undefined> };

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}
import {
  getDidDeployOptions,
  getNetwork as getDidNetwork,
} from '../scripts/deploy-did';
import {
  getScoringDeployOptions,
  getNetwork as getScoringNetwork,
} from '../scripts/deploy-scoring';

const originalNetwork = process.env.STACKS_NETWORK;

try {
  process.env.STACKS_NETWORK = 'mainnet';
  assert(
    getDidNetwork().coreApiUrl.includes('mainnet'),
    'DID network should be mainnet'
  );
  assert(
    getScoringNetwork().coreApiUrl.includes('mainnet'),
    'Scoring network should be mainnet'
  );

  process.env.STACKS_NETWORK = 'testnet';
  assert(
    getDidNetwork().coreApiUrl.includes('testnet'),
    'DID network should be testnet'
  );
  assert(
    getScoringNetwork().coreApiUrl.includes('testnet'),
    'Scoring network should be testnet'
  );

  const didOptions = getDidDeployOptions('code', 'key');
  assert(
    didOptions.contractName === 'identity-provider-v1',
    'DID contract name mismatch'
  );
  assert(didOptions.anchorBlockOnly === true, 'DID anchorBlockOnly should be true');

  const scoringOptions = getScoringDeployOptions('code', 'key');
  assert(
    scoringOptions.contractName === 'reputation-score-v1',
    'Scoring contract name mismatch'
  );
  assert(
    scoringOptions.anchorBlockOnly === true,
    'Scoring anchorBlockOnly should be true'
  );

  console.log('Script helpers checks passed.');
} finally {
  if (originalNetwork) {
    process.env.STACKS_NETWORK = originalNetwork;
  } else {
    delete process.env.STACKS_NETWORK;
  }
}
