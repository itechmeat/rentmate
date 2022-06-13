const logger = require('node-color-log')

logger.setDate(() => (new Date()).toLocaleTimeString())

module.exports = logger
