import { BigNumberish } from "@ethersproject/bignumber";

export type Token = {
  id: number;
  decimals: number;
  name: string;
  symbol: string;
};

export type VaultAsset = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  vaultSymbol: string;
  erc20address: string;
  icon: string;
  vaultContractAddress: string | null;
  vaultContractABI: any[];
  balance: BigNumberish;
  vaultBalance: BigNumberish;
  decimals: number;
  deposit: boolean;
  depositAll: boolean;
  depositDisabled: boolean;
  withdraw: boolean;
  withdrawAll: boolean;
  lastMeasurement: number;
  measurement: number;
  apy?: number;
};
