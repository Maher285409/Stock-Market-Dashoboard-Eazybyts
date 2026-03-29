import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Cards from "./components/Cards";
import StrengthMeter from "./components/StrengthMeter";
import ChartBox from "./components/ChartBox";

function App() {
  const [symbol, setSymbol] = useState("AAPL");

  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem("balance")) || 10000;
  });

  const [stocks, setStocks] = useState(() => {
    return Number(localStorage.getItem("stocks")) || 0;
  });

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });

  const [price, setPrice] = useState(100);

  // Save data
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("stocks", stocks);
    localStorage.setItem("history", JSON.stringify(history));
  }, [balance, stocks, history]);

  // ✅ ADD THIS HERE (SAVE TO BACKEND)
  useEffect(() => {
    async function loadData() {
      const res = await fetch("http://localhost:5000/api/user");
      const data = await res.json();

      setBalance(data.balance);
      setStocks(data.stocks);
      setHistory(data.history);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("http://localhost:5000/api/user");
      const data = await res.json();

      setBalance(data.balance);
      setStocks(data.stocks);
      setHistory(data.history);
    }

    loadData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance,
        stocks,
        history,
      }),
    });
  }, [balance, stocks, history]);

  // Fetch API
  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`
        );

        const data = await res.json();

        const livePrice = parseFloat(data?.["Global Quote"]?.["05. price"]);

        if (!isNaN(livePrice)) {
          setPrice(livePrice);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchStock();
    const interval = setInterval(fetchStock, 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  function buyStock() {
    if (balance >= price) {
      setBalance((prev) => prev - price);
      setStocks((prev) => prev + 1);

      const newTrade = `BUY ${symbol} @ $${price}`;
      setHistory((prev) => [newTrade, ...prev]);
    }
  }

  function sellStock() {
    if (stocks > 0) {
      setBalance((prev) => prev + price);
      setStocks((prev) => prev - 1);

      const newTrade = `SELL ${symbol} @ $${price}`;
      setHistory((prev) => [newTrade, ...prev]);
    }
  }

  const totalValue = balance + stocks * price;
  const profit = totalValue - 10000;

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Topbar />
        <Cards />

        {/* MIDDLE SECTION */}
        <div className="middle">
          <StrengthMeter />
          <ChartBox price={price} symbol={symbol} />

          {/* TRADE BOX */}
          <div className="box">
            <h3>Trade Panel</h3>

            <select onChange={(e) => setSymbol(e.target.value)}>
              <option value="AAPL">Apple</option>
              <option value="TSLA">Tesla</option>
              <option value="GOOG">Google</option>
              <option value="MSFT">Microsoft</option>
            </select>

            <p>
              <strong>Stock:</strong> {symbol}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
            <p>
              <strong>Balance:</strong> ${balance}
            </p>
            <p>
              <strong>Stocks:</strong> {stocks}
            </p>

            <button onClick={buyStock}>Buy</button>
            <button onClick={sellStock}>Sell</button>

            <hr />

            <p>
              <strong>Total Value:</strong> ${totalValue}
            </p>
            <p className={profit >= 0 ? "green" : "red"}>Profit: ${profit}</p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom">
          <div className="box stats-box">
            <h3>📊 Statistics</h3>

            <div className="stat-row">
              <span>Total Value</span>
              <span>${totalValue}</span>
            </div>

            <div className="stat-row">
              <span>Balance</span>
              <span>${balance}</span>
            </div>

            <div className="stat-row">
              <span>Stocks</span>
              <span>{stocks}</span>
            </div>

            <div className="stat-row">
              <span>Profit</span>
              <span className={profit >= 0 ? "green" : "red"}>${profit}</span>
            </div>

            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{ width: `${Math.min(stocks * 20, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* TRADE HISTORY HERE */}
          <div className="box">
            <h3>Trade History</h3>

            {history.length === 0 ? (
              <p>No trades yet</p>
            ) : (
              <ul>
                {history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
