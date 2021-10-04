import express from "express";
import feed from "./routes/feed";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/data", feed);

app.listen(8080, () => {
  console.log("The application is listening on port 8080!");
});
