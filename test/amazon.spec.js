//Does not work as is blocked by capcha
return;

const {loadData, openAndWait, setUpDriver} = require('../utils');

describe('amazon', async function() {
  this.timeout(30000000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await setUpDriver(driver, vars);
  });
  afterEach(async function() {
    await driver.quit();
  });
  const url = 'https://www.amazon.com/s?k=';
  let products = loadData('groceries.txt');
  for(let key in products) {
    const v = products[key];
    it('products ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }

  products = loadData('tech.txt');
  for(let key in products) {
    const v = products[key];
    it('tech ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }

  products = loadData('pets.txt').map((i)=> {
    const p = i.split('>');
    return _.trim(p[p.length],' ');
  });
  
  for(let key in products) {
    const v = products[key];
    it('pets ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }

  products = loadData('sporting.txt').map((i)=> {
    const p = i.split('>');
    return _.trim(p[p.length],' ');
  });
  
  for(let key in products) {
    const v = products[key];
    it('sporting ' + v, function (done) {
      openAndWait(driver, url, v, 20000).then(done, done);
    });
  }
});
