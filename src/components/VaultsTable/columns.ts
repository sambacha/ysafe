export const VAULT_TABLE_ID = "id";
export const VAULT_TABLE_SYMBOL_ID = "symbol";
export const VAULT_TABLE_ROI_ID = "apy";
export const VAULT_TABLE_SAFE_BALANCE_ID = "balance";
export const VAULT_TABLE_VAULT_BALANCE_ID = "vaultBalance";
export const VAULT_TABLE_ACTIONS_ID = "actions";

export type Column = {
  id: string;
  order: boolean;
  disablePadding: boolean;
  label: string;
  custom: boolean;
  align?: "right" | "inherit" | "left" | "center" | "justify" | undefined;
  width?: number;
  style?: any;
  static?: boolean;
};

export const generateColumns = () => {
  const assetColumn: Column = {
    id: VAULT_TABLE_SYMBOL_ID,
    order: true,
    disablePadding: false,
    label: "Asset",
    custom: false,
    width: 320,
  };

  const returnColumn: Column = {
    id: VAULT_TABLE_ROI_ID,
    order: true,
    disablePadding: false,
    label: "ROI",
    custom: false,
    width: 120,
  };

  const safeBalanceColumn: Column = {
    id: VAULT_TABLE_SAFE_BALANCE_ID,
    disablePadding: false,
    order: true,
    label: "Safe Balance",
    custom: false,
  };

  const vaultBalanceColumn: Column = {
    id: VAULT_TABLE_VAULT_BALANCE_ID,
    disablePadding: false,
    order: true,
    label: "Vault Balance",
    custom: false,
  };

  const actionColumn: Column = {
    id: VAULT_TABLE_ACTIONS_ID,
    order: false,
    disablePadding: true,
    align: "right",
    label: "",
    custom: false,
    static: true,
  };

  return [assetColumn, returnColumn, safeBalanceColumn, vaultBalanceColumn, actionColumn];
};
