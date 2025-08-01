import express, { response } from "express";
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
app.get<{}, HomeResponse>("/", async (req, res) => {

  let response = await fetch ("http://localhost:3000"); 

  // if response is 200 
  if (response.status === 200) {
    // implement promise to get response body
    let body = await response.json();
    res.json({ 
      message: body.message 
    });
  // if resonse is 500
  } else if (response.status === 500) {
    // implement promise to get response body
    let body = await response.json();
    res.status(500).json({
      message: body.message 
    });
  }

  // res.json({
  //   message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  // });
});

export default app;