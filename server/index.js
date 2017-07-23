const path = require('path')
const { createServer } = require('http')
const { Server } = require('colyseus')
const nodeStatic = require('node-static')
const SwordsRoom = require('./room')

const staticServer = new nodeStatic.Server(path.resolve(__dirname, '..', 'dist'))

const httpServer = module.exports = createServer((req, res) => {
  req.addListener('end', function () {
    staticServer.serve(req, res)
  }).resume()
})

const gameServer = new Server({
  server: httpServer
})

gameServer.register('default', SwordsRoom)
