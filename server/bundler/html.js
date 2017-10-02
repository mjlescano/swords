import fs from 'fs'

const onDev = process.env.NODE_ENV !== 'production'

export default function html (filename) {
  let result = fs.readFileSync(filename)

  console.log(`· Loaded HTML ${filename}`)

  if (onDev) {
    fs.watch(filename, (evt) => {
      result = fs.readFileSync(filename)
      console.log(`· Updated HTML ${filename}`)
    })
  }

  return (req, res) => {
    if (!result) return res.end(503)

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(result)
  }
}
