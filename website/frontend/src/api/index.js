// src/api/index.js
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";

export const fetchCountryData = async (country) => {
  const indicators = ["GDP", "Population"];
  const results = {};

  for (const indicator of indicators) {
    try {
      const response = await axios.get(
        `${BASE_URL}/country/${encodeURIComponent(
          country
        )}, ${encodeURIComponent(country)}/indicator/${encodeURIComponent(
          indicator
        )}, ${encodeURIComponent(indicator)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle case where API returns error object
      if (data.error) {
        console.warn(
          `Error from API for ${indicator} in ${country}:`,
          data.error
        );
        results[indicator] = null;
        continue;
      }

      if (data && data.length > 0) {
        // Find the most recent data point
        const latest = data.reduce((latest, current) =>
          new Date(latest.DateTime) > new Date(current.DateTime)
            ? latest
            : current
        );
        results[indicator] = latest;
      } else {
        results[indicator] = null;
      }
    } catch (error) {
      console.warn(`Error fetching ${indicator} for ${country}:`, error);
      results[indicator] = null;
    }
  }

  return { country, indicators: results };
};

export const fetchHistoricalData = async (country) => {
  const indicators = ["GDP", "Population"];
  const results = {};

  for (const indicator of indicators) {
    try {
      const response = await fetch(
        `${BASE_URL}/country/${encodeURIComponent(
          country
        )}/indicator/${encodeURIComponent(indicator)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle case where API returns error object
      if (data.error) {
        console.warn(
          `Error from API for historical ${indicator} in ${country}:`,
          data.error
        );
        results[indicator] = { labels: [], values: [] };
        continue;
      }

      // Get last 5 years of data
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      const filteredData = data
        .filter((item) => new Date(item.DateTime) >= fiveYearsAgo)
        .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));

      results[indicator] = {
        labels: filteredData.map((item) =>
          new Date(item.DateTime).getFullYear()
        ),
        values: filteredData.map((item) => item.Value),
      };
    } catch (error) {
      console.warn(
        `Error fetching historical ${indicator} for ${country}:`,
        error
      );
      results[indicator] = { labels: [], values: [] };
    }
  }

  return results;
};
