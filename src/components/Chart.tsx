import React, { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

interface ChartProps {
  id: string; // Change the type to match the actual type of coinData.id
}

interface Custom {
  active?: boolean;
  label?: string;
  payload?: Array<{ value: number }>;
  currency: string;
}

const CustomTooltip: React.FC<Custom> = ({
  payload,
  label,
  active,
  currency,
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-In",
          {
            style: "currency",
            currency: currency,
            maximumSignificantDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const ChartComponent: React.FC<{
  data: [];
  currency: string;
  type: string;
}> = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth={"1px"}
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey={"date"} />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip currency={currency} />}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart: React.FC<ChartProps> = ({ id }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);
  let { currency } = useContext(CryptoContext) || {};
  const validCurrency = currency || "usd";
  useLayoutEffect(() => {
    const getChartData = async (id: string) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);
        let convertData = data[type].map((item: string) => {
          return {
            data: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });
        setChartData(convertData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  const chartTypes = [
    { type: "prices", label: "Price" },
    { type: "market_caps", label: "Market Caps" },
    { type: "total_volumes", label: "Total Volumes" },
  ];

  const dayOptions = [7, 14, 30];

  return (
    <div className="w-full h-[60%]">
      <ChartComponent data={chartData} currency={validCurrency} type={type} />

      <div className="flex">
        {chartTypes.map((chartType) => (
          <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded ${type === chartType.type ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} key={chartType.type} onClick={() => setType(chartType.type)}>
            {chartType.label}
          </button>
        ))}

        {dayOptions.map((day, index) => (
          <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded ${day === days ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} key={day} onClick={() => setDays(day)}>
            {`${day}d`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
