import type React from "react";
import { useState, useEffect } from "react";
import { ArrowDownUp, Loader2, TrendingUp, AlertCircle } from "lucide-react";
import { usePrices } from "./../hooks/useprices";
import { CurrencySwapSkeleton } from "./skeleton";

const CurrencySwapForm = () => {
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
    getExchangeRate,
    getAvailableCurrencies,
  } = usePrices();

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      return;
    }

    const rate = getExchangeRate(fromCurrency, toCurrency);
    if (rate !== null) {
      setExchangeRate(rate);
    } else {
      setError("Exchange rate not available for selected currencies");
    }
  }, [fromCurrency, toCurrency, getExchangeRate]);

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const calculated = (Number.parseFloat(fromAmount) * exchangeRate).toFixed(
        6
      );
      setToAmount(calculated);
    } else {
      setToAmount("");
    }
  }, [fromAmount, exchangeRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setError("");
  };

  const handleAmountChange = (value: string) => {
    setError("");
    setSuccess(false);

    if (value === "") {
      setFromAmount("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Please enter a valid number");
      return;
    }

    if (Number.parseFloat(value) < 0) {
      setError("Amount must be positive");
      return;
    }

    if (Number.parseFloat(value) > 1000000) {
      setError("Amount exceeds maximum limit (1,000,000)");
      return;
    }

    setFromAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (fromCurrency === toCurrency) {
      setError("Please select different currencies");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const availableCurrencies = getAvailableCurrencies();

  if (pricesLoading && Object.keys(prices).length === 0) {
    return <CurrencySwapSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Currency Swap</h1>
          <p className="text-indigo-200">
            Exchange currencies at real-time rates
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {pricesLoading && (
            <div className="mb-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-xl p-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-300 animate-spin" />
              <p className="text-blue-100 text-sm">
                Loading real-time prices...
              </p>
            </div>
          )}

          {pricesError && (
            <div className="mb-4 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-100 text-sm">
                Failed to load prices: {pricesError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-indigo-100">
                From
              </label>
              <div className="relative">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  disabled={pricesLoading || availableCurrencies.length === 0}
                  className="w-full bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-3 pr-10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent appearance-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {availableCurrencies.map((curr) => (
                    <option
                      key={curr}
                      value={curr}
                      className="bg-indigo-900 text-white"
                    >
                      {curr}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/20 backdrop-blur-sm text-white text-2xl rounded-xl px-4 py-4 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent placeholder-white/50 font-semibold"
              />
            </div>

            <div className="flex justify-center -my-2">
              <button
                type="button"
                onClick={handleSwap}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                <ArrowDownUp className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-indigo-100">To</label>
              <div className="relative">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  disabled={pricesLoading || availableCurrencies.length === 0}
                  className="w-full bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-3 pr-10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent appearance-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {availableCurrencies.map((curr) => (
                    <option
                      key={curr}
                      value={curr}
                      className="bg-indigo-900 text-white"
                    >
                      {curr}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-white/10 backdrop-blur-sm text-white text-2xl rounded-xl px-4 py-4 border border-white/30 font-semibold">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-300" />
                  </div>
                ) : (
                  toAmount || "0.00"
                )}
              </div>
            </div>

            {exchangeRate && !loading && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200 text-sm">Exchange Rate</span>
                  <span className="text-white font-semibold">
                    1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <p className="text-red-100 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-xl p-4">
                <p className="text-green-100 text-sm text-center font-medium">
                  ✓ Swap completed successfully!
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                !fromAmount ||
                Number.parseFloat(fromAmount) <= 0 ||
                pricesLoading
              }
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Swap Currency"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-indigo-200 text-xs text-center">
              Rates are updated in real-time from Switcheo. Swap fees may apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwapForm;
