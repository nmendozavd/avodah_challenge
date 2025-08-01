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
  if(response.status === 200) {
    let body = await response.json();
    res.json({
      message: body,
    });
  } 
    // show user message
  // otherwise
    // show user error message 
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default app;
