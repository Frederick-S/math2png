const express = require('express')
const mathjax = require('mathjax-node-svg2png')
const app = express()

mathjax.start()

app.get('/', (request, response) => {
  const math = request.query.math

  mathjax.typeset({
    math,
    format: 'TeX',
    png: true,
    scale: 2
  }, (data) => {
    if (data.errors) {
      console.log(data.errors)

      response.status(500).end('TeX parse error')
    } else {
      const png = Buffer.from(data.png.replace(/^data:image\/\w+;base64,/, ''), 'base64')

      response.contentType('image/png')
      response.end(png)
    }
  })
})

app.listen(3000, () => console.log('App listening on port 3000!'))
