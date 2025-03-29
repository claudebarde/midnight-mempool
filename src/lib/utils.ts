import type { Extrinsic } from "@polkadot/types/interfaces";

export const getTxType = (extrinsic: Extrinsic): TxType => {
  const tx = extrinsic.meta.toHuman();

  if (tx.name === "send_mn_transaction") {
    return "transfer";
  }
  return "other";
};

export const shortenHash = (hash: string, length: number = 8): string => {
  if (hash.length <= length * 2) {
    return hash;
  }
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
};
