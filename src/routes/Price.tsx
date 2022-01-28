import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinNews } from "../api";

interface PriceProps {
  coinId: string;
}

interface NewsProps {
  id: string;
  date: string;
  date_to: string;
  name: string;
  description: string;
  is_conference: boolean;
  link: string;
  proof_image_link: string;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 16px;
  }
`;

const Description = styled.div`
  letter-spacing: 1px;
  width: auto;
  height: 70px;
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<NewsProps[]>(
    ["ohlcv", coinId],
    () => fetchCoinNews(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {/*<PriceChange>
        <h1>
          Price change <br />
          in 2 weeks:
        </h1>
        <h1>
          {isLoading
            ? "Calculating..."
            : data?.map((price) => price.close.toFixed(2))}
        </h1>
          </PriceChange>*/}
      <Header>
        <h1>Events</h1>
        <h2>Might change your coin price!</h2>
      </Header>
      <hr />
      <div>
        <h1>{data?.map((news) => news.name)}</h1>
        <Description>
          {data?.map((news) => news.description.slice(0, 100) + " ...")}
        </Description>
      </div>
    </div>
  );
}

export default Price;
