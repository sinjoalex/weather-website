// Program made by Sinjo Alex for NodeJS class practice
const request = require("request");

// Forecast function
const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bb11c54933c6a29bc81d980495af8ef8&query=" +
    lat +
    "," +
    lon +
    "&units=m";
  //console.log(forecastURL);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach the Weather Service", undefined);
    } else if (body.error) {
      callback(
        "Service error " + body.error.code + ": " + body.error.info,
        undefined
      );
    } else {
      const temp = body.current;
      callback(
        undefined,
        temp.weather_descriptions[0] +
          ". It's currently " +
          temp.temperature +
          " degrees out. It feels like " +
          temp.feelslike +
          " degrees out. The humidity is " +
          temp.humidity +
          "%"
      );
    }
  });
};
module.exports = forecast;
