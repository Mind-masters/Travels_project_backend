const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./plugins/db");
require("dotenv").config({
  path: "./.env",
});

const PORT = process.env.PORT || 5001;

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:'30mb', extended : true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended : true}));
app.use(cors());

app.use("/api/v1", require("./api/index"));
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.listen(PORT, () => {
  db();
  console.log("The server listening on port " + PORT);
});
