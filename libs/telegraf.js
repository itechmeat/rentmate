const { Telegraf } = require('telegraf')
const { generateText, postsControls } = require('../libs/texts')

const telegramBot = new Telegraf('5338129871:AAFIESunhLTKXny1hCONRe4lqu3AtSPpvBM')

const sendPost = async (channel, message) => {
  await telegramBot.telegram.sendPhoto(
    channel,
    message.image,
    {
      caption: generateText({
        type: message.type,
        price: message.price,
        address: message.address,
        m2: message.m2,
        desc: message.desc,
        url: message.url_source,
      }),
      parse_mode: 'HTML',
      reply_markup: postsControls,
    }
  )
}

module.exports = { telegramBot, sendPost }
