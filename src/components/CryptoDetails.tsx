import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";

interface HighLowIndicatorProps {
  currentPrice: number;
  high: number;
  low: number;
}

const HighLowIndicator: React.FC<HighLowIndicatorProps> = ({
  currentPrice,
  high,
  low,
}) => {
  const [green, setGreen] = useState<number>(0);

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);
  return (
    <>
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

const CryptoDetails: React.FC = () => {
  let { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  let { getCoinData, coinData, currency } = useContext(CryptoContext) || {};

  useLayoutEffect(() => {
    if (getCoinData) {
      if (coinId) {
        getCoinData(coinId);
      }
    }
  }, [coinId]);

  const close = () => {
    navigate("..");
  };
  return ReactDOM.createPortal(
    <div
      onClick={close}
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
      >
        {coinData ? (
          <div className="flex items-center justify-between w-full h-full p-4">
            <div className="w-[45%] flex flex-col h-full pr-2">
              <div className="flex items-center gap-2 w-full">
                <img
                  src={coinData.image.large}
                  className="w-[3rem] h-[3rem] mx-1.5"
                  alt={coinData.id}
                />
                <h1 className="capitalize text-lg font-medium">
                  {coinData.name}
                </h1>
                <span className="text-sm py-0.5 px-2.5 bg-cyan text-cyan bg-opacity-25 rounded uppercase">
                  {coinData.symbol}
                </span>
              </div>

              <div className="flex w-full mt-6">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <div className="text-gray-100 capitalize text-sm">
                      <span>Price</span>
                    </div>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 ${
                        coinData.market_data.price_change_percentage_24h > 0
                          ? "bg-green text-green"
                          : "bg-red text-red"
                      }`}
                    >
                      <span>
                        {Number(
                          coinData.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-[1rem] ml-0.5 ${
                          coinData.market_data.price_change_percentage_24h > 0
                            ? "fill-cyan rotate-180"
                            : "fill-red"
                        }`}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  {coinData.market_data.current_price && currency ? (
                    <h2 className="text-lg font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        maximumSignificantDigits: 5,
                      }).format(coinData.market_data.current_price[currency])}
                    </h2>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Market Cap
                  </span>
                  {coinData.market_data.market_cap && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.market_cap[currency])}
                    </h2>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    fully diluted valuation
                  </span>
                  {coinData.market_data.fully_diluted_valuation && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        notation: "compact",
                      }).format(
                        coinData.market_data.fully_diluted_valuation[currency]
                      )}
                    </h2>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-gray-100">
                  total volume
                </span>
                {coinData.market_data.total_volume && currency ? (
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-In", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinData.market_data.total_volume[currency])}
                  </h2>
                ) : null}
              </div>

              <div className="flex w-full mt-4 justify-between">
                {currency && (
                  <HighLowIndicator
                    currentPrice={coinData.market_data.current_price[currency]}
                    high={coinData.market_data.high_24h[currency]}
                    low={coinData.market_data.low_24h[currency]}
                  />
                )}
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    low 24H
                  </span>
                  {coinData.market_data.low_24h && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 5,
                      }).format(coinData.market_data.low_24h[currency])}
                    </h2>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    high 24H
                  </span>
                  {coinData.market_data.high_24h && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 5,
                      }).format(coinData.market_data.high_24h[currency])}
                    </h2>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    max supply
                  </span>
                  {coinData.market_data.max_supply && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.max_supply)}
                    </h2>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    circulating supply
                  </span>
                  {coinData.market_data.circulating_supply && currency ? (
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-In", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(coinData.market_data.circulating_supply)}
                    </h2>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={coinData?.links?.homepage[0]}
                  >
                    {coinData?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={coinData?.links?.blockchain_site[0]}
                  >
                    {coinData?.links?.blockchain_site[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={coinData?.links?.official_forum_url[0]}
                  >
                    {coinData?.links?.official_forum_url[0].substring(0, 30)}
                  </a>
                </div>
                <div className="flex flex-col content-start">
                  <span className="text-sm capitalize text-gray-100">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green text-green
                       
                      }`}
                    >
                      <span>
                        {Number(coinData.sentiment_votes_up_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-[1rem] ml-0.5 fill-green rotate-180 `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 my-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red text-red `}
                    >
                      <span>
                        {Number(
                          coinData.sentiment_votes_down_percentage
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-[1rem] ml-0.5 fill-red`}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[55%] flex flex-col h-full pl-3">
              <Chart id={coinData.id} />

              <div>
                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    market cap rank:
                  </span>{" "}
                  {coinData.market_cap_rank}
                </h3>
                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    coinGecko rank:
                  </span>{" "}
                  {coinData.coingecko_rank}
                </h3>
                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    coinGecko score:
                  </span>{" "}
                  {coinData.coingecko_score}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-[60vh] h-full flex justify-center items-center">
            <div
              role="status"
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
            ></div>
            <span className="ml-2">Please wait...</span>
          </div>
        )}
      </div>
    </div>,
    document
      .getElementById("model")
      ?.appendChild(document.createElement("div")) ||
      document.createElement("div")
  );
};

export default CryptoDetails;
