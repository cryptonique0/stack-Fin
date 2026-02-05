# Documentation

- Overview: [overview.md](overview.md)

## Environment

- Copy `.env.example` to `.env` and fill in required values.
- Use `STACKS_NETWORK=testnet` for default testnet behavior.

## Configuration

- Network addresses live in `config/addresses.json`.

## Contracts

- Identity Provider: `identity-provider-v1`
- Reputation Score: `reputation-score-v1`

## Guides

- Deployment: see scripts in [../scripts](../scripts)
- Examples: see [../examples](../examples)

## Tests

- Contract interface checks: `tests/test-contracts.ts`
- Script helper checks: `tests/test-scripts.ts`

## CI

CI runs lint and tests via `.github/workflows/ci.yml`.
