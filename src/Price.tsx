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

const PriceChange = styled.span<{ isPlus: number }>`
  color: ${(props) => (props.isPlus > 0 ? "#df7d46" : "#3c90eb")};
`;

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["priceChange", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  var hour = Math.sign(data?.quotes.USD.percent_change_1h || 1);
  var day = Math.sign(data?.quotes.USD.percent_change_24h || 1);
  var week = Math.sign(data?.quotes.USD.percent_change_7d || 1);
  var month = Math.sign(data?.quotes.USD.percent_change_30d || 1);
  var year = Math.sign(data?.quotes.USD.percent_change_1y || 1);

  return (
    <div>
      {isLoading ? (
        "Loading Price Change..."
      ) : (
        <PriceTabs>
          <PriceTab>
            1h CHANGE:{" "}
            <PriceChange isPlus={hour}>
              {hour > 0
                ? `+${data?.quotes.USD.percent_change_1h}%`
                : `${data?.quotes.USD.percent_change_1h}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            24h CHANGE:{" "}
            <PriceChange isPlus={day}>
              {day > 0
                ? `+${data?.quotes.USD.percent_change_24h}%`
                : `${data?.quotes.USD.percent_change_24h}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 WEEK CHANGE:{" "}
            <PriceChange isPlus={week}>
              {week > 0
                ? `+${data?.quotes.USD.percent_change_7d}%`
                : `${data?.quotes.USD.percent_change_7d}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 MONTH CHANGE:{" "}
            <PriceChange isPlus={month}>
              {month > 0
                ? `+${data?.quotes.USD.percent_change_30d}%`
                : `${data?.quotes.USD.percent_change_30d}%`}
            </PriceChange>
          </PriceTab>
          <PriceTab>
            1 YEAR CHANGE:{" "}
            <PriceChange isPlus={year}>
              {year > 0
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
