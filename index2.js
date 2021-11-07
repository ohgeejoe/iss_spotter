
   
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require("./iss_promised");

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const data = JSON.parse(body);
    console.log(data.response);
  });

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message)
  })