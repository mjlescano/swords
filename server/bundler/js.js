/* eslint-disable node/no-unpublished-require */
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'

const onDev = process.env.NODE_ENV !== 'production'

export default function js (entry) {
  console.log(`· Bundling ${entry}`)

  let result

  const plugin = []

  if (onDev) plugin.push(watchify)

  const asset = browserify({
    debug: false,
    cache: {},
    packageCache: {},
    plugin
  })
    .transform(babelify)
    .require(entry, { entry: true })
    .on('update', bundle)

  function bundle () {
    asset.bundle((err, buff) => {
      if (err) {
        console.error(`· Error bundling ${entry}:`)
        console.error(err)
        return
      }

      result = buff

      console.log(`· Bundled ${entry}`)
    })
  }

  bundle()

  return (req, res) => {
    if (!result) {
      res.writeHead(503, { 'Content-Type': 'application/javascript' })
      res.end()
      return
    }

    res.writeHead(200, { 'Content-Type': 'application/javascript' })
    res.end(result)
  }
}
