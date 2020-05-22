const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e02ad3bc30c07b6deec2837377f925dc&query=${longitude},${latitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature: degrees, feelslike, humidity } = body.current;
      const description = body.current.weather_descriptions[0];
      callback(
        undefined,
        `${description}. It is currently ${degrees} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}.`
      );
    }
  });
};

module.exports = forecast;
