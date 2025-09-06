import { useState, useEffect } from "react";
import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";
import { fetchCountryData, fetchHistoricalData } from "./api/index.js";

function App() {
  const [country1, setCountry1] = useState("sweden");
  const [country2, setCountry2] = useState("mexico");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [historicalData1, setHistoricalData1] = useState(null);
  const [historicalData2, setHistoricalData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    if (country1 === country2) {
      setError("Please select two different countries");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [country1Data, country2Data] = await Promise.all([
        fetchCountryData(country1),
        fetchCountryData(country2),
      ]);

      const [historical1, historical2] = await Promise.all([
        fetchHistoricalData(country1),
        fetchHistoricalData(country2),
      ]);

      setData1(country1Data);
      setData2(country2Data);
      setHistoricalData1(historical1);
      setHistoricalData2(historical2);
    } catch (err) {
      setError("Error loading data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Header />
      <CountrySelector
        country1={country1}
        country2={country2}
        setCountry1={setCountry1}
        setCountry2={setCountry2}
        onCompare={loadData}
      />

      {error && <div className="error">{error}</div>}

      <Loading visible={loading} />

      {!loading && data1 && data2 && historicalData1 && historicalData2 && (
        <Dashboard
          data1={data1}
          data2={data2}
          historicalData1={historicalData1}
          historicalData2={historicalData2}
        />
      )}
    </div>
  );
}

export default App;
