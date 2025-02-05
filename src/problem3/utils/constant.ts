import { BlockChainName } from "./type";

export const PRESICION = 0;
export const DEFAULT_BLOCK_CHAIN_PRIORITY = -99;

export const BLOCK_CHAIN_PRIORITY = {
  [`${BlockChainName.Osmosis}`]: 100,
  [`${BlockChainName.Ethereum}`]: 50,
  [`${BlockChainName.Zilliqa}`]: 30,
  [`${BlockChainName.Neo}`]: 20,
};
