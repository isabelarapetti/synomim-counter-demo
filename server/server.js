const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const db = require("./Models/dbModel");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

const api = require("./api");

const app = express();

// TODO see another json parser
// Parsers for POST data
app.use(bodyParser.json());

// Cross Origin middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//inicializa models
db.sequelize.sync();

// Set our api routes
app.use("/", api);

const port = process.env.PORT || "4000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
