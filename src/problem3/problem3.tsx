import type React from "react";
import { useMemo } from "react";
import { useWalletBalances } from "../hooks/usewalletbalances";
import { usePrices } from "../hooks/useprices";
import { WalletRow } from "./walletRow";
import type { PriceCache } from "../types/currency.types";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props {
  [key: string]: PriceCache;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const rest = props;
  const balances = useWalletBalances();
  const { prices } = usePrices();

  const getPriority = useMemo(() => {
    return (blockchain: string): number => {
      const priorityMap: Record<string, number> = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
      };
      return priorityMap[blockchain] ?? -99;
    };
  }, []);

  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue: Number(prices[balance.currency] ?? 0) * balance.amount,
      }));
  }, [balances, getPriority, prices]);

  const rows = formattedBalances.map((balance: FormattedWalletBalance) => (
    <WalletRow
      key={balance.currency}
      amount={balance.amount}
      usdValue={balance.usdValue}
      formattedAmount={balance.formatted}
    />
  ));

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
