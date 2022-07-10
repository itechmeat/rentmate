require('dotenv').config()
const { bot } = require('./bot')
const { setMenuCommands, setOtherCommands } = require('./commands')
const { handleUser } = require('./user')
const { handleMessage } = require('./messages')

setMenuCommands()
setOtherCommands()

const startDialog = async () => {
  bot.on('text', async (ctx) => {
    const user = await handleUser(ctx?.message)
    handleMessage(ctx, user)
  })
  
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = { bot, startDialog }
