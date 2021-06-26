const request = require("request");

const foreCast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6bf2723e7bd56435dc3162c0e8878da1&units=metric`;
  // console.log(url);
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to Weather Service :(" + err, undefined);
    } else if (body.error) {
      callback("Unable to find Location :(" + body.error, undefined);
    } else {
      const { weather, main, visibility, sys, wind, name } = body;
      callback(undefined, {
        weather,
        main,
        visibility,
        sys,
        name,
        icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`,
      });
    }
  });
};

module.exports = foreCast;
