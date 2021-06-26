const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiczAxMDQiLCJhIjoiY2twcno5c3Z0MGJjNzJ3dDg2dnBoYTMzMSJ9.cFrcS596YRf8c-wG9tUHAg&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to Weather App :(", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location :(", undefined);
    } else {
      const { features } = body;
      const latitude = features[0].center[1];
      const longitude = features[0].center[0];
      const location = features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geoCode;
