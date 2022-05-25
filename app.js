'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const Bree = require('bree')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  const bree = new Bree({
    // https://github.com/breejs/bree
    jobs: [
      {
        name: '4zida.rs',
        timeout: '1s',
        interval: '5m'
      }
    ]
  })

  bree.start()
}
