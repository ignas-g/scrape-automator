const {loadData, datasetExists, openReplaceAndWait, setUpDriver} = require('../utils');
const axios = require('axios');
const _ = require('lodash');
const assert = require('assert');


describe.only('universal', async function() {
  console.log('universal');
  this.timeout(30000000);

  it('dummy test', function() {
    console.log('dummy test called');
    assert(true);

  });


  let driver;
  let vars;


  before( function(done) {
    this.timeout(30000000);
    async function  getScrapers() {
      console.log('before');

      const domain = process.env.SCRAPERS_DOMAIN || 'https://www.crowdflation.io';
      console.log('universal2');

      const {data} = await axios.get(`${domain}/api/scrapers`);


      const parsedScraper = JSON.parse(data);

      console.log('universal3', parsedScraper.length);
      const filteredScrapers = parsedScraper.filter((i) => {
        return !!i.searchUrl && !!i.datasets;
      });
      console.log('' + filteredScrapers.length + ' scrapers found');

      describe('Generated spec', function () {
        this.timeout(30000000)
        beforeEach(async function() {
          driver = await setUpDriver(driver, vars);
        });
        afterEach(async function() {
          await driver.quit();
        });

        for(const scraper of filteredScrapers) {
          console.log('Testing scraper: ');

          scraper.datasets.map((dataset) => {
            // check file exists
            if (!datasetExists(dataset)) {
              console.error(`Dataset ${dataset} for scraper ${scraper?.scraper?.name} does not exist`);
              return;
            }

            let url = scraper.searchUrl;
            url = url.replace('${website}', _.trim(scraper.website, '  /' ));
            console.log('Scraping website', url, scraper.website);

            let products = loadData(dataset);
            console.log('products', products);

            products.map((product) => {
              console.log('product', product);
              try {
                const description = `testing for scraper ${scraper?.scraper?.name} product ${product}`;
                console.log('Making test', description);
                //it(description,  async function () {
                const testFunction = function (done) {
                  this.timeout(30000000)
                  console.log('testFunction');
                  const callbackDone = function(rez) {
                    console.log('callback done', rez);
                    done(rez);
                  };
                  try {
                      console.log('openReplaceAndWait', product);
                      const promise = openReplaceAndWait(driver, url, product, 20000);
                      promise.then(async () => {
                        console.log('done waiting');
                        callbackDone();
                      }, callbackDone);
                  }
                  catch (e) {
                    console.error('Error', e);
                  }
                };
                it(description, testFunction);
                //testFunction();
              } catch (e) {
                console.error('Error calling test', product, e);
              }
            });
          });
        }
      });
    }
    getScrapers().then(done, done);
  })
});
