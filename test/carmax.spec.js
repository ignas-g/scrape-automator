const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('carmax', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.carmax.com/cars?search=';
  const products = loadData('cars.txt');
  for(let key in products) {
    const v = products[key];
    it('cars ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});

