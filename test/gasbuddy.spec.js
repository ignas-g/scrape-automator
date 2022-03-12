const {loadData, openAndWait, setUpDriver} = require('../utils');
const axios = require('axios');

function getCoordinates(address){
  return new Promise(function(succ, fail) {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=' + process.env.GOOGLE_MAPS_API_KEY_NO_REF;
    axios.get(url)
        .then((response) => {
          const data = response.data;
          const lat = data.results[0].geometry.location.lat;
          const lng = data.results[0].geometry.location.lng;
          succ({lat, lng});
          console.log({lat, lng})
        });
  });
}

describe('gasbuddy', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });


  const products = loadData('postcodes.txt');

  for(let key in products) {
    const v = products[key];
    await it('postcode ' + v, async function (done) {
      const {lat, lng} = await getCoordinates(v).catch((ex) => {
        console.error(ex);
      });
      const url = `https://www.gasbuddy.com/gaspricemap?lat=${lat}&lng=${lng}&z=11`;
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});
