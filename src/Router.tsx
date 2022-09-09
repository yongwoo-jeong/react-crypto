import { Routes, Route, BrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />}></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/:coinId/*`}
          element={<Coin />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
