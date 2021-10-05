import express from "express";
import feed from "./routes/feed";
import bodyParser from "body-parser";
import mongoose from "mongoose";
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

mongoose
  .connect(
    "mongodb+srv://tomato:ms4680SXk0j12JG6@cluster0.z1y59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((res) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("The application is listening on port 8080!");
});
