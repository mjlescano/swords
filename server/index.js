import path from 'path'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { js, html } from './bundler'
import SwordsRoom from './room'

const serveClient = js(path.resolve(__dirname, '..', 'client', 'index.js'))
const serveLayout = html(path.resolve(__dirname, '..', 'client', 'index.html'))

const httpServer = createServer((req, res) => {
  req.addListener('end', function () {
    console.log(`${req.method} ${req.url}`)

    if (req.method === 'GET' && req.url === '/index.js') {
      return serveClient(req, res)
    }

    if (req.method === 'GET' && req.url === '/') {
      return serveLayout(req, res)
    }

    res.writeHead(404)
    res.end(req.method === 'GET' ? 'Not Found' : undefined)
  }).resume()
})

const gameServer = new Server({
  server: httpServer
})

gameServer.register('default', SwordsRoom)

export default httpServer
