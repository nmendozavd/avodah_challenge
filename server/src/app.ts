import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

type HomeResponse = {
  message: string;
};

app.get<{}, HomeResponse>("/", (req, res) => {
  // utilize random number to generate between 0 and 1
  let randomNum = Math.random();
    // if num is equal or less than .60
  if (randomNum <= .60) {
    res.json({
      message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
  // otherise send a 500 
  } else {
    res.status (500).json({
      message: "500 Internal Server Error"
    })
  }
});



app.get("/resilient-consumer", async (req, res) => {
  const url = "http://localhost:3000/"; 

  try {
    const data = await fetchWithRetry(url, 3, 500);
    res.status(200).json({ 
      success: true, 
      data });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

export default app;
