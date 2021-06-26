const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");
const app = express();

// Define path for Express config
const publicDir = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partials);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sumit Gupta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    foreCast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({ err });
      }
      res.send({ response });
    });
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Sumit Gupta",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
