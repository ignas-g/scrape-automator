const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('zillow', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.zillow.com/willow-ak/';
  const groceries = loadData('postcodes.txt');
  for(let key in groceries) {
    const v = groceries[key];
    it('postcode ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});
