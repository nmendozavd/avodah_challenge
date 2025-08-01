import app from "./app";

const port = process.env.PORT || 4000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Client is listening on: http://localhost:${port}`);
  /* eslint-enable no-console */
});
