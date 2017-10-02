require('babel-register')
const server = require('./server').default

const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || 'development'
const isTTY = process.stdout.isTTY

server.listen(port, () => {
  const domain = `http://localhost:${port}`

  if (env === 'development' && isTTY) {
    console.log(`· Server running on ${domain} (copied to clipboard) ·`)
    require('clipboardy').write(domain) // eslint-disable-line node/no-unpublished-require
  } else {
    console.log(`· Server running on ${domain} ·`)
  }
})
