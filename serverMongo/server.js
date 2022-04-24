const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParse = require("body-parser");
const connectDB = require("./database/connection");

const app = express();
app.use(express.json());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 4001;
app.use(morgan("short"));

app.use(
  cors({
    origin: ["http://3.101.191.130:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParse.urlencoded({ extended: true }));

//load routers
app.use("/", require("./routes/router"));
app.use("/", require("./routes/productsRouter"));

module.exports = app.listen(PORT, () => console.log("Server Started"));
