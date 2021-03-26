import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { VaultAsset } from "../@types";

const getAPY = async (provider: Provider, asset: VaultAsset): Promise<number> => {
  if (asset.vaultContractAddress === null) {
    return 0;
  }
  if (asset.measurement == null) {
    return 0;
  }
  try {
    const block = await provider.getBlockNumber();
    const vault = new Contract(asset.vaultContractAddress, asset.vaultContractABI, provider);
    const pricePerFullShare = await vault.getPricePerFullShare();

    const growthInWei = pricePerFullShare.sub(asset.measurement.toString());
    const blocksSinceVaultCreation = block - asset.lastMeasurement;

    const magicNumber = 2425846;
    const roi = growthInWei.mul(magicNumber).div(blocksSinceVaultCreation);

    return parseFloat(formatUnits(roi, 18));
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export default getAPY;
