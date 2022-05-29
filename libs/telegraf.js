const { Telegraf } = require('telegraf')
const { generateText, postsControls } = require('../libs/texts')

// https://core.telegram.org/bots/api#available-methods
const telegramBot = new Telegraf('5338129871:AAFIESunhLTKXny1hCONRe4lqu3AtSPpvBM')

const sendPost = async (chatId, message) => {
  let desc = message.desc
  if (desc?.length > 800) {
    desc = desc.slice(0, 800) + ' ...'
  }

  await telegramBot.telegram.sendPhoto(
    chatId,
    message.image,
    {
      caption: generateText({
        category: message.category,
        price: message.price,
        address: message.address,
        m2: message.m2,
        desc,
        url: message.urlPage,
      }),
      parse_mode: 'HTML',
      reply_markup: postsControls,
    }
  )
}

module.exports = { telegramBot, sendPost }
