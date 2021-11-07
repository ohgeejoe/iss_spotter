const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
}

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${IP}`);
}

const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body).data;
  const lat = data.latitude;
  const lon = data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const data = JSON.parse(body);
    return data.response;
    });
}

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};