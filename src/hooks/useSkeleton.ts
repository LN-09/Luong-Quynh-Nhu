import { useState, useEffect } from "react";
interface UsePricesReturn {
  prices: Record<string, number>;
  loading: boolean;
  error: string | null;
  refreshPrices: () => Promise<void>;
}

export function usePrices(): UsePricesReturn {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      setPrices({});
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return {
    prices,
    loading,
    error,
    refreshPrices: fetchPrices,
  };
}
