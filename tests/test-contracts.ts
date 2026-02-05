import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const contractsDir = path.join(__dirname, '..', 'contracts');

const identityContract = fs.readFileSync(
  path.join(contractsDir, 'identity-provider-v1.clar'),
  'utf8'
);

assert.ok(
  identityContract.includes('(define-read-only (get-profile'),
  'identity-provider-v1 must expose get-profile'
);
assert.ok(
  identityContract.includes('(define-public (update-profile'),
  'identity-provider-v1 must expose update-profile'
);

const scoringContract = fs.readFileSync(
  path.join(contractsDir, 'reputation-score-v1.clar'),
  'utf8'
);

assert.ok(
  scoringContract.includes('(define-read-only (get-score'),
  'reputation-score-v1 must expose get-score'
);
assert.ok(
  scoringContract.includes('(define-public (add-vote'),
  'reputation-score-v1 must expose add-vote'
);
assert.ok(
  scoringContract.includes('(define-public (add-loan-repayment'),
  'reputation-score-v1 must expose add-loan-repayment'
);

console.log('Contract interface checks passed.');
