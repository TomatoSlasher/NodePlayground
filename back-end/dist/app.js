"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feed_1 = __importDefault(require("./routes/feed"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/data", feed_1.default);
mongoose_1.default
    .connect("mongodb+srv://tomato:ms4680SXk0j12JG6@cluster0.z1y59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then((res) => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
app.listen(8080, () => {
    console.log("The application is listening on port 8080!");
});
