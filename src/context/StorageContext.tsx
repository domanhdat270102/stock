import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import { CryptoContext } from "./CryptoContext";

interface CryptoContextProps {
    saveCoin: (coinId: string) => void | null ; // Replace 'any' with the appropriate type
    allCoins: any[];
    removeCoin: (coinId: string) => void | null;
    savedData: any[];
    resetSavedResult: () => void
}
export const StorageContext = createContext<CryptoContextProps | undefined>({
  saveCoin: () => null,
  allCoins: [],
  removeCoin: () => null,
  savedData: [],
  resetSavedResult: () => {}
});
export const StorageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allCoins, setAllCoins] = useState<any[]>([]);
  const [savedData, setSavedData] = useState<any[]>([]);
  let {currency, sortBy} = useContext(CryptoContext) || {}

  const saveCoin = (coinId: string) => {
    let coinString = localStorage.getItem("coins");
    if (coinString) {
      let oldCoins = JSON.parse(coinString);

      if (oldCoins.includes(coinId)) {
        return null;
      } else {
        let newCoin = [...oldCoins, coinId];
        setAllCoins(newCoin);
        localStorage.setItem("coins", JSON.stringify(newCoin));
      }
    }
  };

  const removeCoin = (coinId: string) => {
    let coinString = localStorage.getItem("coins");
    if (coinString) {
        let oldCoins = JSON.parse(coinString);

        let newCoin = oldCoins.filter((coin: string) => coin !== coinId)
        setAllCoins(newCoin)
        localStorage.setItem("coins", JSON.stringify(newCoin))
    }
  }

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(',')}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
            `)
          .then((res) => res.json())
          .then((json) => json);

      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData()
  }

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins)
    } else {
      setSavedData([])
    }
  }, [allCoins])

  useLayoutEffect(() => {
    let coinsString = localStorage.getItem("coins");
    let isThere = coinsString ? JSON.parse(coinsString) : false;

    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      if (coinsString) {
        let totalCoins = JSON.parse(coinsString);
        setAllCoins(totalCoins);
        if (totalCoins.length > 0) {
            getSavedData(totalCoins)
        }
      }
    }
  }, []);

  const contextValue: CryptoContextProps = {
    saveCoin,
    allCoins,
    removeCoin,
    savedData,
    resetSavedResult
  };
  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};
