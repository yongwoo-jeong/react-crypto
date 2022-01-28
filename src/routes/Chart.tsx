import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isCandleAtom, isDarkAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const ChartSwitch = styled.button<{ isdark: boolean }>`
  width: 80px;
  height: 30px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => (props.isdark ? "white" : "black")}; ;
`;

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const [candle, setCandle] = useRecoilState(isCandleAtom);
  const onClick = () => {
    setCandle((prev) => !prev);
  };
  return (
    <div>
      {isLoading ? (
        "Loading line chart ..."
      ) : candle ? (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Math.round(price.close)),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((time) => time.time_close),
              axisTicks: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      ) : (
        <ApexChart
          type="candlestick"
          height={350}
          series={[
            {
              name: "coin price",
              data: data?.map((price) => [
                new Date(price.time_close).getTime(),
                price.open.toFixed(4),
                price.high.toFixed(4),
                price.low.toFixed(4),
                price.close.toFixed(4),
              ]),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((time) => time.time_close),
              axisTicks: {
                show: false,
              },
            },
          }}
        />
      )}
      <ChartSwitch isdark={isDark} onClick={onClick}>
        Switch
      </ChartSwitch>
    </div>
  );
}

export default Chart;
