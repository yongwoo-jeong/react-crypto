import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";
import type { PriceData } from "./routes/Coin";

const PriceTabs = styled.ul``;

const PriceTab = styled.li`
  background-color: rgba(0, 0, 0, 0.25);
  height: 7vh;
  margin: 15px 15px;
  border: solid #df7d46 #3c90eb;
  border-radius: 13px;
  text-align: center;
  padding-top: 20px;
`;

const PriceChange = styled.span<{ isPlus: boolean }>`
  color: ${(props) => (props.isPlus ? "#df7d46" : "#3c90eb")};
`;

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["priceChange", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );
  const isPlus = {
    hour: true,
    day: true,
    week: false,
    month: false,
    year: false,
  };

  return (
    <div>
      {isLoading ? (
        "Loading Price Change..."
      ) : (
        <PriceTabs>
          <PriceTab>
            1h CHANGE:{" "}
            <PriceChange isPlus={isPlus.hour}>
              {isPlus.hour
                ? `+${data?.quotes.USD.percent_change_1h}%`
                : `${data?.quotes.USD.percent_change_1h}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            24h CHANGE:{" "}
            <PriceChange isPlus={isPlus.day}>
              {isPlus.day
                ? `+${data?.quotes.USD.percent_change_24h}%`
                : `${data?.quotes.USD.percent_change_24h}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 WEEK CHANGE:{" "}
            <PriceChange isPlus={isPlus.week}>
              {isPlus.week
                ? `+${data?.quotes.USD.percent_change_7d}%`
                : `${data?.quotes.USD.percent_change_7d}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 MONTH CHANGE:{" "}
            <PriceChange isPlus={isPlus.month}>
              {isPlus.month
                ? `+${data?.quotes.USD.percent_change_30d}%`
                : `${data?.quotes.USD.percent_change_30d}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 YEAR CHANGE:{" "}
            <PriceChange isPlus={isPlus.year}>
              {isPlus.year
                ? `+${data?.quotes.USD.percent_change_1y}%`
                : `${data?.quotes.USD.percent_change_1y}%`}
            </PriceChange>
          </PriceTab>
        </PriceTabs>
      )}
    </div>
  );
}

export default Price;
