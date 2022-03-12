const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const _ = require('lodash');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');

const numberOfItems = process.env.NUM_OF_ITEMS || 2;


exports.openAndWait = async function(driver, url, parameter, time) {
  // TODO: Use a template for where the parameter goes (if not at the end)
  await driver.get(url+ encodeURIComponent(parameter));
  return new Promise(function(succ) {
    setTimeout(succ, time);
  });
};


exports.setUpDriver = async function(driver, vars) {
  let options = new chrome.Options();
  const unpackedExtensionPath = process.env.PATH_TO_EXT || 'd:/prj/1729/alphaCheap/dist/';
  options.addArguments(["--load-extension=" + '/Users/ignasgalvelis/Documents/code/alphaCheap/dist']);

  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
  vars = {}
  return driver;
};


exports.loadData = function(fn) {
  return _.slice(_.shuffle(fs.readFileSync('./data/' + fn).toString().split('\n').map(pr => _.trim(pr, '\n\r\t ".,'))), 0, numberOfItems);
}