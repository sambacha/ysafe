import React, { ReactElement, useState, ChangeEvent } from "react";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";
import { ModalFooterConfirmation, GenericModal, Text, TextField, Button } from "@gnosis.pm/safe-react-components";

import styled from "styled-components";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { useSendTransactions } from "../../contexts/SafeContext";
import { VaultAsset } from "../../@types";
import { BigNumberToRoundedHumanFormat } from "../../utils";
import { vaultDepositTxs, vaultWithdrawTxs, vaultDepositAllTxs, vaultWithdrawAllTxs } from "../../transactions";

const StyledItem = styled.div`
  align-items: center;
  display: flex;
  height: 51px;
  justify-content: space-between;
  padding: 0px 24px;
`;

interface Props {
  vaultAsset: VaultAsset | null;
  setVaultAsset: (newVaultAsset: VaultAsset | null) => void;
  action: "deposit" | "withdraw";
}

const prepareTransactions = (
  vaultAsset: VaultAsset,
  action: "deposit" | "withdraw",
  amount: BigNumberish,
  maxAmount: BigNumberish,
): Transaction[] => {
  if (action === "deposit") {
    return vaultAsset.depositAll && BigNumber.from(amount).eq(maxAmount)
      ? vaultDepositAllTxs(vaultAsset as VaultAsset)
      : vaultDepositTxs(vaultAsset as VaultAsset, amount);
  }
  return vaultAsset.withdrawAll && BigNumber.from(amount).eq(maxAmount)
    ? vaultWithdrawAllTxs(vaultAsset as VaultAsset)
    : vaultWithdrawTxs(vaultAsset as VaultAsset, amount);
};

const VaultModal = ({ vaultAsset, setVaultAsset, action }: Props): ReactElement | null => {
  const sendTransactions = useSendTransactions();
  /** State Variables **/
  const [amount, setAmount] = useState<string>("");

  if (vaultAsset === null) return null;

  const assetSymbol = action === "deposit" ? vaultAsset.symbol : vaultAsset.vaultSymbol;
  const maxAmount = action === "deposit" ? vaultAsset.balance : vaultAsset.vaultBalance;

  const performAction = (actionAmount: BigNumber) => {
    if (actionAmount.gt(0) && actionAmount.lte(maxAmount)) {
      sendTransactions(prepareTransactions(vaultAsset, action, actionAmount, maxAmount));
    }
  };

  const handleChangeAmount = (newAmount: string) => {
    if (newAmount === "") {
      setAmount(newAmount);
      return;
    }
    try {
      const newAmountInWei = parseUnits(newAmount, vaultAsset.decimals);
      const newAmountTruc = newAmountInWei.lte(maxAmount) ? newAmount : formatUnits(maxAmount, vaultAsset.decimals);
      setAmount(newAmountTruc);
    } catch (error) {
      console.warn("Error setting new amount");
    }
  };

  const closeModal = () => {
    setAmount("0");
    setVaultAsset(null);
  };

  const capitalisedAction = action[0].toUpperCase() + action.slice(1);
  const modalTitle = `${capitalisedAction} ${vaultAsset.symbol}`;

  const modalBody = (
    <>
      <StyledItem>
        <Text size="lg">Balance</Text>
        <Text size="lg">{`${BigNumberToRoundedHumanFormat(maxAmount, vaultAsset.decimals)} ${assetSymbol}`}</Text>
      </StyledItem>
      <StyledItem>
        <Text size="lg">{`${capitalisedAction} Amount`}</Text>
        <TextField
          style={{ width: "200px" }}
          label="Amount"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChangeAmount(e.target.value)}
        />
      </StyledItem>
      <StyledItem>
        <Button
          size="md"
          color="primary"
          onClick={() => setAmount(formatUnits(BigNumber.from(maxAmount).div(4), vaultAsset.decimals))}
        >
          25%
        </Button>
        <Button
          size="md"
          color="primary"
          onClick={() => setAmount(formatUnits(BigNumber.from(maxAmount).div(2), vaultAsset.decimals))}
        >
          50%
        </Button>
        <Button
          size="md"
          color="primary"
          onClick={() =>
            setAmount(
              formatUnits(
                BigNumber.from(maxAmount)
                  .mul(3)
                  .div(4),
                vaultAsset.decimals,
              ),
            )
          }
        >
          75%
        </Button>
        <Button
          size="md"
          color="primary"
          onClick={() => setAmount(formatUnits(BigNumber.from(maxAmount), vaultAsset.decimals))}
        >
          100%
        </Button>
      </StyledItem>
    </>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText={`${capitalisedAction}`}
      handleCancel={closeModal}
      handleOk={() => {
        console.log(`${action}ing ${amount} ${assetSymbol}`);
        performAction(parseUnits(amount, vaultAsset.decimals));
      }}
    />
  );

  return <GenericModal onClose={closeModal} title={modalTitle} body={modalBody} footer={modalFooter} />;
};

export default VaultModal;
