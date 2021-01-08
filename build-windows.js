const puppeteer = require('puppeteer')
const path = require('path');

(async () => {
  const os = {
    platform: 'win64',
    version: 555668
  }

  const f = puppeteer.createBrowserFetcher({
    platform: os.platform,
    path: path.join(__dirname, 'bin', 'puppeteer')
  })

  await f.download(os.version)
})()
