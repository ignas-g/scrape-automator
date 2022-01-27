const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('collegescorecard', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://collegescorecard.ed.gov/search?distance=10&page=0&sort=completion_rate:desc&toggle=institutions&zip=';
  const products = loadData('postcodes.txt');

  for(let key in products) {
    const v = products[key];
    it('diy ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});

