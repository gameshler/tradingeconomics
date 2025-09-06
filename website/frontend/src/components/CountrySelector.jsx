const CountrySelector = ({
  country1,
  country2,
  setCountry1,
  setCountry2,
  onCompare,
}) => {
  const countries = ["mexico", "sweden"];

  return (
    <div className="controls">
      <select value={country1} onChange={(e) => setCountry1(e.target.value)}>
        {countries.map((country) => (
          <option key={`c1-${country}`} value={country}>
            {country.charAt(0).toUpperCase() + country.slice(1)}
          </option>
        ))}
      </select>

      <select value={country2} onChange={(e) => setCountry2(e.target.value)}>
        {countries.map((country) => (
          <option key={`c2-${country}`} value={country}>
            {country.charAt(0).toUpperCase() + country.slice(1)}
          </option>
        ))}
      </select>

      <button onClick={onCompare}>Compare Countries</button>
    </div>
  );
};

export default CountrySelector;
