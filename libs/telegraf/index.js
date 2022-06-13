require('dotenv').config()
const { bot } = require('./bot')
const { setComands } = require('./comands')
const { handleUser } = require('./user')

setComands()

const startDialog = () => {
  bot.on('text', (ctx) => {
    const chat = ctx?.message?.chat
    // console.log('chat', chat)
    handleUser(ctx?.message)
    
    ctx.telegram.sendMessage(ctx.chat.id, `Hello ${chat?.username}, your chatId is ${chat?.id}`)
    ctx.telegram.sendMessage(16867973, `New user: ID - ${chat?.id}, username - ${chat?.username}, name: ${chat?.first_name}, surname: ${chat?.last_name}`)
  })
  
  bot.launch()
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = { bot, startDialog }
