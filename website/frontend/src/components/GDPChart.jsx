import BaseChart from "./BaseChart";

const GDPChart = ({ data1, data2, country1, country2 }) => {
  return (
    <BaseChart
      data1={data1}
      data2={data2}
      country1={country1}
      country2={country2}
      title="GDP Comparison (USD Billion)"
    />
  );
};

export default GDPChart;
