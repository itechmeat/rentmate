const { supabaseClient } = require('../libs/supabase')
const telegramBot = require('../libs/telegraf')
const { examplePost } = require('../libs/texts')


const searchByFilter = async (params) => {
  let query = supabaseClient
    .from('apartments')
    .select('city_id, price, m2, address, desc, image, url_source')

  if (params.city) {
    query = query.eq('city_id', params.city)
  }
  if (params.priceFrom) {
    query = query.gte('price', params.priceFrom)
  }
  if (params.priceTo) {
    query = query.lte('price', params.priceTo)
  }

  const { data, error } = await query

  return {
    filter: params,
    results: data,
    error,
  }
}

const searchFilterByData = async (params) => {
  telegramBot.telegram.sendPhoto(
    16867973,
    'https://m1.spitogatos.gr/233425077_1600x1200.jpg?v=20130730',
    {
      caption: examplePost,
      parse_mode: 'HTML',
    }
  )

  let query = supabaseClient
    .from('filters')
    .select()

  if (params.city) {
    query = query.eq('city', params.city)
  }
  if (params.price) {
    query = query.lte('priceFrom', params.price)
    query = query.gte('priceTo', params.price)
  }
  if (params.m2) {
    query = query.lte('areaFrom', params.m2)
    query = query.gte('areaTo', params.m2)
  }

  const { data, error } = await query

  return {
    filter: params,
    results: data,
    error,
  }
}

module.exports = { searchByFilter, searchFilterByData }