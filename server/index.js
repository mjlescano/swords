const { createServer } = require('http')
const { Server } = require('colyseus')
const SwordsRoom = require('./room')

const httpServer = module.exports = createServer()

const gameServer = new Server({
  server: httpServer
})

gameServer.register('default', SwordsRoom)
