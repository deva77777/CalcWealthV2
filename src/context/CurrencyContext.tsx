import { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencyInfo: CurrencyInfo;
  formatCurrency: (value: number, options?: { maximumFractionDigits?: number }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const currencyInfo = currencies[currency];

  const formatCurrency = (value: number, options?: { maximumFractionDigits?: number }) => {
    const maxDigits = options?.maximumFractionDigits ?? 0;
    
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currencyInfo.code,
      maximumFractionDigits: maxDigits,
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencyInfo, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
