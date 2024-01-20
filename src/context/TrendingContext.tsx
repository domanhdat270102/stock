import React, {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useLayoutEffect,
  } from "react";
  
  interface CryptoContextProps {
    trendData: any;
    resetTrendingResult: () => void
  }
  export const TrendingContext = createContext<CryptoContextProps | undefined>({
    trendData: null,
    resetTrendingResult: () => {}
  });
  export const TrendingProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [trendData, setTrendData] = useState<any>(null)
  
    const getTrendData = async () => {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/search/trending
              `)
          .then((res) => res.json())
          .then((json) => json);
        setTrendData(data.coins);
        console.log('data coins', data);
        
      } catch (error) {
        console.log(error);
      }
  
    };
  
  
    const resetTrendingResult = () => {
      getTrendData()
    }
  
    useLayoutEffect(() => {
      getTrendData();
    }, []);
  
    const contextValue: CryptoContextProps = {
        trendData,
        resetTrendingResult
    };
    return (
      <TrendingContext.Provider value={contextValue}>
        {children}
      </TrendingContext.Provider>
    );
  };
  