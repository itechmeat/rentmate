require('dotenv').config()
const { bot } = require('./bot')
const { setComands } = require('./comands')
const { handleUser } = require('./user')
const { handleMessage } = require('./messages')

setComands()

const startDialog = async () => {
  bot.on('text', async (ctx) => {
    const chat = ctx?.message?.chat
    const user = await handleUser(ctx?.message)
    handleMessage(ctx?.message, user)
    
    ctx.telegram.sendMessage(ctx.chat.id, `Hello ${chat?.username}, your chatId is ${chat?.id}`)
    ctx.telegram.sendMessage(16867973, `New user: ID - ${chat?.id}, username - ${chat?.username}, name: ${chat?.first_name}, surname: ${chat?.last_name}`)
  })
  
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = { bot, startDialog }
