import { Interface, JsonFragment } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";
import { VaultAsset } from "../@types";
import Erc20Abi from "../abis/erc20.json";

const erc20ApproveTx = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const erc20Interface: Interface = new Interface(Erc20Abi as JsonFragment[]);

  const approvalTransaction: Transaction = {
    data: erc20Interface.encodeFunctionData("approve", [vaultAsset.vaultContractAddress, amount]),
    to: vaultAsset.erc20address,
    value: "0",
  };

  return approvalTransaction;
};

export default erc20ApproveTx;
