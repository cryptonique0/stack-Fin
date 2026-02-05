import * as assert from 'assert';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
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
  assert.strictEqual(getDidNetwork(), STACKS_MAINNET, 'DID network should be mainnet');
  assert.strictEqual(
    getScoringNetwork(),
    STACKS_MAINNET,
    'Scoring network should be mainnet'
  );

  process.env.STACKS_NETWORK = 'testnet';
  assert.strictEqual(getDidNetwork(), STACKS_TESTNET, 'DID network should be testnet');
  assert.strictEqual(
    getScoringNetwork(),
    STACKS_TESTNET,
    'Scoring network should be testnet'
  );

  const didOptions = getDidDeployOptions('code', 'key');
  assert.strictEqual(
    didOptions.contractName,
    'identity-provider-v1',
    'DID contract name mismatch'
  );
  assert.strictEqual(didOptions.anchorBlockOnly, true, 'DID anchorBlockOnly should be true');

  const scoringOptions = getScoringDeployOptions('code', 'key');
  assert.strictEqual(
    scoringOptions.contractName,
    'reputation-score-v1',
    'Scoring contract name mismatch'
  );
  assert.strictEqual(
    scoringOptions.anchorBlockOnly,
    true,
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
