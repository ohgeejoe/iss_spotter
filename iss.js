/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', function(error, response, body) {
   
    
    if (error) {
      callback(`Error! Something broke buddy. Heres what was passed to error ${error}`,null);
      return; //need this?
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const IP = data.ip;
    if (IP) {
      callback(null,IP);
    }

  });
};

const fetchCoordsbyIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`,  (error, resp, body) => {
    if (error) return callback(error,null);

    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, resp, body) => {
    if (error) return callback(error,null);
  
    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }
    let passes = JSON.parse(body).response;
    callback(null, passes);
    
  });
 
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,IP) => {
    if (error) { return callback(error,null);}
    fetchCoordsbyIP(IP, (error, coords) => {
      if (error) { return callback(error,null);}
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) { return callback(error,null);}
        callback(null, passes);
      });
    }
    );
  });
};






module.exports = { fetchMyIP };
module.exports = { fetchCoordsbyIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };