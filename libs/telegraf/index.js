require('dotenv').config()
const { bot } = require('./bot')
const { setCommands } = require('./commands')
const { handleUser } = require('./user')
const { handleMessage } = require('./messages')

setCommands()

const startDialog = async () => {
  bot.on('text', async (ctx) => {
    const user = await handleUser(ctx?.message)
    handleMessage(ctx?.message, user)
  })
  
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = { bot, startDialog }
