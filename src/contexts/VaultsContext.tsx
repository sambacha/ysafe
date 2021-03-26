import React, { createContext, ReactElement, useContext, useState, useEffect } from "react";
import { getDefaultProvider } from "@ethersproject/providers";
import VAULT_ASSETS from "../config/vaultAssets";
import { VaultAsset } from "../@types";
import { useSafeNetwork, useSafeAddress } from "./SafeContext";
import { getAPY, getBalance } from "../utils";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  vaultAssets: VaultAsset[];
}

export const VaultContext = createContext({} as State);

export function useVaultContext(): State {
  return useContext(VaultContext);
}

function VaultProvider({ children }: Props) {
  const safeAddress = useSafeAddress();
  const network = useSafeNetwork() || "mainnet";

  const [vaultAssets, setVaultAssets] = useState<VaultAsset[]>(VAULT_ASSETS);

  useEffect(() => {
    const updateAPY = async () => {
      const provider = getDefaultProvider(network, { infura: process.env.REACT_APP_INFURA_KEY, quorum: 1 });
      try {
        const newVaultAssets = await Promise.all(
          VAULT_ASSETS.map(async asset => ({
            ...asset,
            apy: await getAPY(provider, asset),
            balance: await getBalance(provider, asset.erc20address, safeAddress || ""),
            vaultBalance: await getBalance(provider, asset.vaultContractAddress || "", safeAddress || ""),
          })),
        );
        setVaultAssets(newVaultAssets);
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    updateAPY();
  }, [safeAddress, network]);

  return <VaultContext.Provider value={{ vaultAssets }}>{children}</VaultContext.Provider>;
}

export const useVaultAssets = (): VaultAsset[] => {
  const { vaultAssets } = useVaultContext();
  return vaultAssets;
};

export default VaultProvider;
