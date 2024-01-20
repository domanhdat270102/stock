import React from "react";
import { useNavigate } from "react-router-dom";
interface TrendingCoinProps {
  data: {
    // Definir cấu trúc của object data ở đây
    name: string;
    coin_id: string;
    small: string;
    market_cap_rank: number
    price_btc: number
    score: number
    large: string
    id: string
    // ... các prop khác
  };
}
const TrendingCoin: React.FC<TrendingCoinProps> = ({ data }) => {
    let navigate = useNavigate()
    const getCoinDetails = (id: string) => {
        navigate(`${id}`)
    }
  return (
    <div onClick={() => getCoinDetails(data.id)} className="w-[40%] bg-gray-200 mb-12 last:mb-0 p-4 rounded-lg relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40">
      {data ? (
        <>
        <h3 className="text-base flex items-center my-0.5">
          <span className="text-gray-100 capitalize">name:&nbsp;</span>
          <span className="text-cyan">{data.name}</span>
          <img
            src={data.small}
            alt={data.name}
            className="w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full"
          />
        </h3>

        <h3 className="text-base flex items-center my-0.5">
          <span className="text-gray-100 capitalize">market cap rank:&nbsp;</span>
          <span className="text-cyan">{data.market_cap_rank}</span>
        </h3>

        <h3 className="text-base flex items-center my-0.5">
          <span className="text-gray-100 capitalize">price (in btc):&nbsp;</span>
          <span className="text-cyan">
            {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5
            }).format(data.price_btc)}
          </span>
        </h3>

        <h3 className="text-base flex items-center my-0.5">
          <span className="text-gray-100 capitalize">score:&nbsp;</span>
          <span className="text-cyan">{data.score}</span>
        </h3>

        <img src={data.large} alt={data.name} className="w-[35%] h-auto rounded-full absolute top-2/4 -right-12 -translate-y-2/4"/>

        </>
        
        
      ) : null}
    </div>
  );
};

export default TrendingCoin;
