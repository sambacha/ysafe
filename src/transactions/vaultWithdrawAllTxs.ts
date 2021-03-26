import { Interface } from "@ethersproject/abi";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";
import { VaultAsset } from "../@types";

const vaultWithdrawAllTx = (vaultAsset: VaultAsset): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const withdrawTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdrawAll"),
    to: vaultAddress,
    value: "0",
  };

  return withdrawTransaction;
};

const vaultWithdrawAllETHTx = (vaultAsset: VaultAsset): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const withdrawTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdrawAllETH"),
    to: vaultAddress,
    value: "0",
  };

  return withdrawTransaction;
};

const vaultWithdrawAllTxs = (vaultAsset: VaultAsset): Transaction[] => {
  if (vaultAsset.erc20address === "Ethereum") {
    const withdrawTransaction = vaultWithdrawAllETHTx(vaultAsset);
    return [withdrawTransaction];
  }

  const withdrawTransaction = vaultWithdrawAllTx(vaultAsset);

  return [withdrawTransaction];
};

export default vaultWithdrawAllTxs;
