export interface PriceInfo {
  currency: string;
  price: number;
  date: string;
}

export interface ExchangeRateInfo {
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  timestamp: string;
}

export interface PriceCache {
  [key: string]: PriceInfo;
}
