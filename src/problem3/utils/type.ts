export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockChainName; // Ensure blockchain is included
  formatted?: number;
}

export enum WalletBalanceSortPriority {
  LEFT = "leftPriority",
  RIGHT = "rightPriority",
}

export enum BlockChainName {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Zilliqa = "Zilliqa",
  Arbitrum = "Arbitrum",
  Neo = "Neo",
}
