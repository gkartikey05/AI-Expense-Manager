import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CurrencyContextType = {
  currency: string;
  changeCurrency: (symbol: string) => void;
  formatNumber: any
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState("₹");

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  const changeCurrency = (symbol: string) => {
    setCurrency(symbol);
    localStorage.setItem("currency", symbol);
  };

  //  formatNumber function
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, changeCurrency, formatNumber }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
