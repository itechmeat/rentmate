'use strict'
// const fastify = require('fastify')
const axios = require('axios')
const { supabaseClient, fetchFromDB } = require('../libs/supabase')
const logger = require('node-color-log')
const { sendPost } = require('../libs/telegraf')

logger.setDate(() => (new Date()).toLocaleTimeString())

const getCityLink = (city) => {
  // https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=1
  return `https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=${city}`
}

const getApartmentLink = (id) => {
  // https://api.4zida.rs/v5/eds/628d0d962544f858b64afa5d
  return `https://api.4zida.rs/v5/eds/${id}`
}

const start = async () => {
  const { data: parsedData } = await axios.get(getCityLink(1))
  const sourceIds = parsedData.ads.map(ad => ad.id)
  const idsEqAString = sourceIds.map(id => `sid.eq.${id}`).join(',')

  const dbResult = await fetchFromDB('apartments', 'sid', idsEqAString)
  const dbSids = dbResult.data?.map(item => item.sid)

  const newApartmentsIds = sourceIds.filter(id => !dbSids.includes(id))

  if (!newApartmentsIds?.length) {
    logger.warn('Nothing to send');
    return
  }

  let apartments
  await axios.all(newApartmentsIds.map((apartmentId) => axios.get(getApartmentLink(apartmentId))))
    .then(response => apartments = response.map(result => result.data))  

  const insertData = apartments.map(apartment => ({
    sid: apartment.id,
    source: '4zida.rs',
    type: apartment.type,
    city_id: apartment.cityId,
    created_at_source: apartment.createdAt,
    price: apartment.price,
    m2: apartment.m2,
    image: apartment.images?.[0]?.adDetails?.['1920x1080_fit_0_jpeg'] || apartment.images?.[0]?.adDetails?.['500x400_fit_0_jpeg'] || apartment.image?.search?.['380x0_fill_0_jpeg'],
    address: apartment.address,
    url_source: apartment.url,
    desc: apartment.desc,
    origin: apartment,
  }))

  await supabaseClient
    .from('apartments')
    .insert(insertData)

  logger.success(`Added new apartments from 4zida.rs: ${insertData?.length}`);

  if (!insertData?.length) return 

  for (let post of insertData) {
    await sendPost(16867973, post)
  }
}

start()
