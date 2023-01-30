const findChromeVersion = require("find-chrome-version")

const { exec } = require("child_process");
const updateChromeVersion = async () => {
  const chromeVersion = await findChromeVersion()
  console.log(`Your Chrome version is ${chromeVersion}`)

  const majorVersion = chromeVersion.split('.')[0];
  const fullVersionNumber = `${majorVersion}.0.0.0`;
  const fs = require('fs');
  const packageJsonContents = fs.readFileSync('./package.json').toString();
  const packageJson = JSON.parse(packageJsonContents);

  if(packageJson.devDependencies['chromedriver'] == fullVersionNumber) {
    console.log('Chrome version in chromedriver is up to date');
    return;
  }
  packageJson.devDependencies['chromedriver'] = fullVersionNumber;
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  // run npm install
  await new Promise((resolve, reject) => {
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });
  console.log('Chrome version updated to', fullVersionNumber);
}
updateChromeVersion()