const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('iceland', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.iceland.co.uk/search?q=';
  const products = loadData('groceries.txt');
  for(let key in products) {
    const v = products[key];
    it('products ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});
