import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function ChartBox({ price, symbol }) {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();

      // 🔥 simulate movement
      const randomPrice = price + (Math.random() * 6 - 3);

      setDataPoints((prev) => [...prev.slice(-19), randomPrice]);
      setLabels((prev) => [...prev.slice(-19), time]);
    }, 2000);

    return () => clearInterval(interval);
  }, [price]);

  const change =
    dataPoints.length > 1
      ? (dataPoints[dataPoints.length - 1] - dataPoints[0]).toFixed(2)
      : 0;

  const isUp = change >= 0;

  const chartData = {
    labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.4)", // 🔥 strong fill
        tension: 0.5,
        fill: true,
        pointRadius: 0,
        borderWidth: 3, // thick line
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: true,
          color: "rgba(255,255,255,0.05)",
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div className="box chart-box">
      
      {/* HEADER */}
      <div className="chart-header">
        <div>
          <h3>{symbol}</h3>
          <p className="price">${price}</p>
        </div>

        <div className={isUp ? "green" : "red"}>
          {isUp ? "+" : ""}
          {change}
        </div>
      </div>

      {/* CHART */}
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      {/* FOOTER */}
      <div className="chart-footer">
        <span>Live</span>
        <span>Updated every 2s</span>
      </div>
    </div>
  );
}

export default ChartBox;