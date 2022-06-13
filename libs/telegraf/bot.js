require('dotenv').config()
const { Telegraf } = require('telegraf')

// https://core.telegram.org/bots/api#available-methods
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

module.exports = { bot }
