import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";

interface CryptoContextProps {
  cryptoData: any;
  searchData: any;
  getSearchResult: (query: string) => Promise<void>;
  setCoinSearch: Dispatch<SetStateAction<string>>;
  setSearchData: Dispatch<SetStateAction<any>>;
  setCurrency: Dispatch<SetStateAction<string>>;
  currency: string;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>> | (() => void);
  totalPages: number;
  resetFunction: () => void
  setPerPage: Dispatch<SetStateAction<number>>
  perPage: number
  getCoinData: (coinId: string) => Promise<void>
  coinData: any
}
export const CryptoContext = createContext<CryptoContextProps | undefined>({
  cryptoData: null,
  searchData: null,
  getSearchResult: async () => {},
  setCoinSearch: () => {},
  setSearchData: () => {},
  setCurrency: () => {},
  currency: "",
  sortBy: "",
  setSortBy: () => {},
  page: 1,
  setPage: () => {},
  totalPages: 250,
  resetFunction: () => {},
  setPerPage: () => {},
  perPage: 10,
  getCoinData: async () => {},
  coinData: null
});
export const CryptoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [coinData, setCoinData] = useState<any>(null);
  const [searchData, setSearchData] = useState<any>(null);
  const [coinSearch, setCoinSearch] = useState<string>("");
  const [currency, setCurrency] = useState<string>("usd");
  const [sortBy, setSortBy] = useState<string>("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(250);
  const [perPage, setPerPage] = useState<number>(10)

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list
            `)
        .then((res) => res.json())
        .then((json) => json);
      setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }

    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
            `)
          .then((res) => res.json())
          .then((json) => json);

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinId: string) => {
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false
            `)
          .then((res) => res.json())
          .then((json) => json);

      setCoinData(data);
      console.log('coin', data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query: string) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };  

  const resetFunction = () => {
    setPage(1)
    setCoinSearch("")
  }

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  const contextValue: CryptoContextProps = {
    cryptoData,
    searchData,
    getSearchResult,
    setCoinSearch,
    setSearchData,
    setCurrency,
    currency,
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    resetFunction,
    setPerPage,
    perPage,
    getCoinData,
    coinData
  };
  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};
