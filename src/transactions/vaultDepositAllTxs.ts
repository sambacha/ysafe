import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";
import { VaultAsset } from "../@types";
import erc20ApproveTx from "./erc20ApproveTx";

const vaultDepositAllTx = (vaultAsset: VaultAsset): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const depositTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("depositAll"),
    to: vaultAddress,
    value: "0",
  };

  return depositTransaction;
};

const vaultDepositAllTxs = (vaultAsset: VaultAsset): Transaction[] => {
  // We need to give an approval greater than the current balance due to aLINK
  // Otherwise the additional interest in the time between loading the app
  // and transaction being confirmed will result in it being reverted.
  const approvalTransaction = erc20ApproveTx(vaultAsset, BigNumber.from(vaultAsset.balance).mul(2));
  const depositTransaction = vaultDepositAllTx(vaultAsset);
  const revokeApprovalTransaction = erc20ApproveTx(vaultAsset, 0);

  return [approvalTransaction, depositTransaction, revokeApprovalTransaction];
};

export default vaultDepositAllTxs;
