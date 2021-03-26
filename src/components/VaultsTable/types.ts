import { ReactElement } from "react";

export type HumanReadableVault = {
  id: string;
  apy: string;
  apyOrder: number;
  symbol: ReactElement;
  symbolOrder: string;
  balance: string;
  balanceOrder: number;
  vaultBalance: string;
  vaultBalanceOrder: number;
};
