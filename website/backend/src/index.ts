import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import { BASE_URL, CLIENT_URL, PORT, API_KEY } from "./constants/env";
import { OK } from "./constants/http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.status(OK).json({
    status: "healthy",
  });
});

app.get("/api/v1/country/:country/indicator/:indicator", async (req, res) => {
  try {
    const { country, indicator } = req.params;
    const response = await axios.get(
      `${BASE_URL}/historical/country/${country}/indicator/${indicator}/?c=${API_KEY}`
    );
    res.status(OK).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
});
