import express from "express";
import feed from "./routes/feed";

const app = express();

app.use(feed);

app.listen(8080, () => {
  console.log("The application is listening on port 8080!");
});
