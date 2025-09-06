const CountryCard = ({ data }) => {
  return (
    <div className="card">
      <h2>{data.country.toUpperCase()}</h2>
      <div className="indicators">
        {Object.entries(data.indicators).map(([key, value]) => {
          if (!value) {
            return (
              <div key={key} className="indicator">
                <h3>{key}</h3>
                <div className="value">No data available</div>
              </div>
            );
          }

          return (
            <div key={key} className="indicator">
              <h3>{key}</h3>
              <div className="value">
                {value.Value.toFixed(2)}
                <span className="unit">{value.Unit || ""}</span>
              </div>
              <div className="date">
                {new Date(value.DateTime).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountryCard;
