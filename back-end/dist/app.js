"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feed_1 = __importDefault(require("./routes/feed"));
// import bodyParser from "body-parser";
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(bodyParser.json());
app.use(bodyParser.json({
    limit: "50mb",
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
}));
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/data", feed_1.default);
mongoose_1.default
    .connect("mongodb+srv://tomato:ms4680SXk0j12JG6@cluster0.z1y59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then((res) => app.listen(8080))
    .catch((err) => console.log(err));
