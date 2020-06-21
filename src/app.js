const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//Define paths for express configurations
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

//Declaring static assets locations
app.use(express.static(publicDirPath));

// Declaring routes for handlebars locations
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sinjo Alex",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " No Address given. Please provide a valid address",
    });
  }

  geoCode(req.query.address, (error, { lat, lon, placeName } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        address: req.query.address,
        placeName: placeName,
        forecast: forecastData,
      });
    });
  });

  //   res.send({
  //     address: req.query.address,
  //     placeName: "Kochi",
  //     tempareture: "29",
  //     feelslike: "32",
  //   });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sinjo Alex",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Sinjo Alex",
    message:
      "Please read this for getting started.Please enter the place name where you would like to get the weather information. Press enter to display the weather information",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404 : ",
    name: "Sinjo Alex",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404 : ",
    name: "Sinjo Alex",
    error: " Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
