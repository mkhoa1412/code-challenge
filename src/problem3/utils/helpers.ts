import {
  BLOCK_CHAIN_PRIORITY,
  DEFAULT_BLOCK_CHAIN_PRIORITY,
  PRESICION,
} from "./constant";
import { BlockChainName } from "./type";

export const formatBalance = (
  value: number,
  precision: number = PRESICION
): number => {
  const factor = Math.pow(10, precision);

  // Convert value to a string to handle large numbers accurately
  const bigValue = BigInt(Math.round(value * factor));
  const bigFactor = BigInt(factor);

  // Convert result back to a number
  return Number(bigValue) / Number(bigFactor);
};

export const getPriority = (blockchain?: BlockChainName): number => {
  if (!blockchain) return DEFAULT_BLOCK_CHAIN_PRIORITY;
  return BLOCK_CHAIN_PRIORITY[blockchain];
};
