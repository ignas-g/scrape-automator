const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('dickssportinggoods', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=';
  const products = loadData('sporting.txt').map((i)=> {
    const p = i.split('>');
    return _.trim(p[p.length],' ');
  });

  for(let key in products) {
    const v = products[key];
    it('diy ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});

