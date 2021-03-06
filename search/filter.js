const { supabaseClient } = require('../libs/supabase')

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
  let query = supabaseClient
    .from('filters')
    .select()

  if (params.cityId) {
    query = query.eq('cityId', params.cityId)
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