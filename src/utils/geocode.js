const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWF0c29zIiwiYSI6ImNrYTh0cXNrbTAwNXQycnBoNnY1Y2tnOTgifQ.f5OxrVclDzoKyUK5Auo7bQ`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const location = {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      };
      callback(undefined, location);
    }
  });
};

module.exports = geocode;
