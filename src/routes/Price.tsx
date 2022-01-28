import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

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

interface PriceProps {
  coinId: string;
}

const PriceChange = styled.div`
  font-size: 14px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  display: flex;
  h1 {
    padding: 0px 7px;
    text-align: center;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      <PriceChange>
        <h1>
          Price change <br />
          in 2 weeks:
        </h1>
        <h1>{isLoading ? "Calculating..." : {}}</h1>
      </PriceChange>
      <h1>Events</h1>
    </div>
  );
}

export default Price;
