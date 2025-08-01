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
  // utilize random to generate between 0 and 1
  let randomAPI = Math.random();
    // if num is equal less than .60
  if (randomAPI <= .60) {
    res.json({
      message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
  } else {
    res.status (500).json({
      message: "Error 500"
    })
  }
});

export default app;
