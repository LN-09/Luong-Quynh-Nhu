import type React from "react";

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  currency?: string;
}

export const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  currency,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-border hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <p className="font-medium text-foreground">{currency}</p>
        <p className="text-sm text-muted-foreground">{formattedAmount}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground">${usdValue.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">{amount} tokens</p>
      </div>
    </div>
  );
};
