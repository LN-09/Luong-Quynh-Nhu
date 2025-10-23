import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import type { PriceCache } from "./../types/currency.types";

const PriceDataSchema = z.object({
  currency: z.string(),
  date: z.string(),
  price: z.number().or(z.string().transform(Number)),
});

const PricesResponseSchema = z.array(PriceDataSchema);

const PRICES_API_URL = "https://interview.switcheo.com/prices.json";

export function usePrices() {
  const [prices, setPrices] = useState<PriceCache>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(PRICES_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch prices: ${response.statusText}`);
      }

      const data = await response.json();

      const validatedData = PricesResponseSchema.parse(data);

      const priceCache: PriceCache = {};
      validatedData.forEach((item) => {
        priceCache[item.currency] = {
          currency: item.currency,
          price:
            typeof item.price === "string"
              ? Number.parseFloat(item.price)
              : item.price,
          date: item.date,
        };
      });

      setPrices(priceCache);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("[v0] Error fetching prices:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const getExchangeRate = useCallback(
    (fromCurrency: string, toCurrency: string): number | null => {
      if (fromCurrency === toCurrency) return 1;

      const fromPrice = prices[fromCurrency]?.price;
      const toPrice = prices[toCurrency]?.price;

      if (!fromPrice || !toPrice) return null;

      return toPrice / fromPrice;
    },
    [prices]
  );

  const getAvailableCurrencies = useCallback(() => {
    return Object.keys(prices).sort();
  }, [prices]);

  return {
    prices,
    loading,
    error,
    getExchangeRate,
    getAvailableCurrencies,
    refetch: fetchPrices,
  };
}
