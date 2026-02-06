import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

export * as transactions from '@stacks/transactions';
export * as auth from '@stacks/auth';
export * as storage from '@stacks/storage';
export * as profile from '@stacks/profile';
export * as encryption from '@stacks/encryption';
export * as walletSdk from '@stacks/wallet-sdk';
export * as connect from '@stacks/connect';
export * as bns from '@stacks/bns';
export * as apiClient from '@stacks/blockchain-api-client';
export { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

export function getStacksNetwork() {
  return process.env.STACKS_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;
}

export function getStacksCoreApiUrl() {
  return getStacksNetwork().coreApiUrl;
}
