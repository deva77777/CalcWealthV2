import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency, currencies, CurrencyCode } from '@/context/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency, currencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencyOptions = Object.values(currencies);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-gray-200"
        aria-label="Select currency"
      >
        <span className="text-lg">{currencyInfo.symbol}</span>
        <span className="hidden sm:inline">{currency}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
            Select Currency
          </div>
          {currencyOptions.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr.code as CurrencyCode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                currency === curr.code ? 'bg-primary-50' : ''
              }`}
            >
              <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-lg font-medium">
                {curr.symbol}
              </span>
              <div className="flex-1">
                <div className={`font-medium ${currency === curr.code ? 'text-primary-600' : 'text-gray-900'}`}>
                  {curr.code}
                </div>
                <div className="text-xs text-gray-500">{curr.name}</div>
              </div>
              {currency === curr.code && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
