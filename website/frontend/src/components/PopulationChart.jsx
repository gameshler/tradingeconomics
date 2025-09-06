import BaseChart from "./BaseChart";

const PopulationChart = ({ data1, data2, country1, country2 }) => {
  return (
    <BaseChart
      data1={data1}
      data2={data2}
      country1={country1}
      country2={country2}
      title="Population Comparison (%)"
    />
  );
};

export default PopulationChart;
