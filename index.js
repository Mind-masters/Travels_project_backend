const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./plugins/db");
const helmet = require("helmet");

require("dotenv").config({
  path: "./.env",
});

const app = express();
app.use(helmet());

dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/v1", require("./api/index"));
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  db();
  console.log("The server listening on port " + PORT);
});
