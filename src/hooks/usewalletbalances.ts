import { useState, useEffect } from "react";

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

export const useWalletBalances = (): WalletBalance[] => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    setBalances([
      { currency: "ETH", amount: 2.5, blockchain: "Ethereum" },
      { currency: "OSMO", amount: 100, blockchain: "Osmosis" },
      { currency: "ARB", amount: 50, blockchain: "Arbitrum" },
      { currency: "ZIL", amount: 0, blockchain: "Zilliqa" },
      { currency: "NEO", amount: 10, blockchain: "Neo" },
    ]);
  }, []);

  return balances;
};
