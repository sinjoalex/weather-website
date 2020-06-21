// Program made by Sinjo Alex for NodeJS class practice
const request = require("request");

//geocode function
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2luam9hbGV4IiwiYSI6ImNrYjhsOXllZzA1ZDYycXF0dno1c2FseGYifQ.0cyqPna5SI6tG9bEX7M7Gw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach the geolocation service", undefined);
    } else if (body.message === "Not Found" || body.features.length === 0) {
      callback(
        "Service error 000:Invalid location input to geolocation service",
        undefined
      );
    } else {
      const placeName = body.features[0].place_name;
      const lat = body.features[0].center[1];
      const lon = body.features[0].center[0];
      callback(undefined, {
        placeName: placeName,
        lat: lat,
        lon: lon,
      });
    }
  });
};
module.exports = geoCode;
