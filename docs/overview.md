# Stack-Fin Docs Overview

## Architecture

- **Contracts**: On-chain identity and reputation logic in Clarity.
  - `identity-provider-v1.clar`: stores user profile metadata.
  - `reputation-score-v1.clar`: aggregates reputation signals.
- **Scripts**: TypeScript deploy scripts for testnet/mainnet.
- **Examples**: SDK usage samples for read/write calls.
- **Tests**: Contract interface and script sanity checks.
- **Config**: Network contract addresses in `config/addresses.json`.
- **CI**: GitHub Actions workflow runs lint and tests on push/PR.

## Network

Current default network: **testnet** (set via `STACKS_NETWORK=testnet`).

To switch to mainnet, set `STACKS_NETWORK=mainnet` in your `.env`.

## Environment

Create a `.env` file based on `.env.example` with:

- `PRIVATE_KEY`
- `STACKS_NETWORK` (`testnet` or `mainnet`)
- `CONTRACT_ADDRESS` (optional override)
- `SENDER_ADDRESS` (used for read-only calls)

## Addresses

Contract addresses are tracked in `config/addresses.json` for both testnet and mainnet.

## Contract Specs

### Identity Provider (`identity-provider-v1`)

**Data Map**
- `profiles: principal -> { nickname, bio, avatar-url, created-at }`

**Read-only**
- `get-profile(user: principal) -> (optional profile)`

**Public**
- `update-profile(nickname, bio, avatar-url) -> (response bool)`

**Notes**
- Only the transaction sender can update their own profile.

### Reputation Score (`reputation-score-v1`)

**Data Map**
- `user-scores: principal -> { governance-votes, loans-repaid, auctions-won, total-score }`

**Read-only**
- `get-score(user: principal) -> (optional score)`

**Public**
- `add-vote(user: principal) -> (response uint)`
- `add-loan-repayment(user: principal) -> (response uint)`

**Scoring Formula**
$$
\text{score} = 10\times \text{votes} + 50\times \text{loans} + 20\times \text{auctions}
$$

## Error Codes

### Identity Provider
- `u100` — not authorized
- `u101` — metadata too long
- `u102` — profile exists

### Reputation Score
- `u100` — not authorized

## Upgrade Strategy

1. **Versioned Contracts**: keep `*-v1` immutable and deploy `*-v2` for new features.
2. **Migration Path**: expose read-only getters in old contracts and provide a migration script to copy state into the new contracts where feasible.
3. **Front-End Switching**: update SDK and UI to point to the latest contract address after migration.
4. **Deprecation Window**: keep old contracts operational for a fixed period, then retire UI support.
5. **Audit Before Release**: perform security review and testnet validation before mainnet deployment.

## Scripts and Tests

**Deploy Scripts**
- `scripts/deploy-did.ts`
- `scripts/deploy-scoring.ts`

**Tests**
- `tests/test-contracts.ts`
- `tests/test-scripts.ts`
