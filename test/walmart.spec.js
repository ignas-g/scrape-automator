const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('walmart', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.walmart.com/search?query=';
  const groceries = loadData('groceries.txt');
  for(let key in groceries) {
    const v = groceries[key];
    it('groceries ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});
