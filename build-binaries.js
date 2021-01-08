const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const puppeteer = require('puppeteer')
const version = 'v' + require('./package.json').version;

(async () => {
  const os = {
    platform: 'win64',
    version: 756035
  }

  const f = puppeteer.createBrowserFetcher({
    platform: os.platform,
    path: path.join(__dirname, 'bin', 'puppeteer')
  })

  await f.download(os.version)

  var output = fs.createWriteStream('bin/flaresolverr-' + version + '-win64.zip')
  var archive = archiver('zip')

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)

  archive.file('bin/flaresolverr-win.exe', { name: 'flaresolverr/flaresolverr.exe' })
  archive.directory('bin/puppeteer/', 'flaresolverr/puppeteer')

  archive.finalize()
})()
