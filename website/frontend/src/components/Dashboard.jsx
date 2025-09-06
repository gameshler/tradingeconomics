import CountryCard from "./CountryCard.jsx";
import GDPChart from "./GDPChart.jsx";
import PopulationChart from "./PopulationChart";

const Dashboard = ({ data1, data2, historicalData1, historicalData2 }) => {
  return (
    <div className="dashboard">
      <div className="country-cards">
        <CountryCard data={data1} />
        <CountryCard data={data2} />
      </div>

      <div className="charts">
        <div className="chart-container">
          <GDPChart
            data1={historicalData1.GDP}
            data2={historicalData2.GDP}
            country1={data1.country}
            country2={data2.country}
          />
        </div>
        <div className="chart-container">
          <PopulationChart
            data1={historicalData1["Population"]}
            data2={historicalData2["Population"]}
            country1={data1.country}
            country2={data2.country}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
