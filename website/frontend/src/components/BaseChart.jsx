import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BaseChart = ({ data1, data2, country1, country2, title }) => {
  const chartData = {
    labels: data1.labels,
    datasets: [
      {
        label: country1.toUpperCase(),
        data: data1.values,
        borderColor: "#667eea",
        backgroundColor: "rgba(102, 126, 234, 0.1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: country2.toUpperCase(),
        data: data2.values,
        borderColor: "#f093fb",
        backgroundColor: "rgba(240, 147, 251, 0.1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 16 },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BaseChart;
