const Loading = ({ visible }) => {
  if (!visible) return null;

  return <div className="loading">Loading data...</div>;
};

export default Loading;
