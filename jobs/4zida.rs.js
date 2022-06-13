'use strict'
const axios = require('axios')
const { supabaseClient, getCommonData, fetchFromDB, fetchData } = require('../libs/supabase')
const logger = require('node-color-log')
const { sendPost } = require('../libs/telegraf')
const { searchFilterByData } = require('../search/filter')

logger.setDate(() => (new Date()).toLocaleTimeString())

const getCityLink = () => {
  // https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=1
  return `https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1`
}

const getApartmentLink = (id) => {
  // https://api.4zida.rs/v5/eds/628d0d962544f858b64afa5d
  return `https://api.4zida.rs/v5/eds/${id}`
}

const start = async () => {
  const { data: parsedData } = await axios.get(getCityLink())
  const sourceIds = parsedData.ads.map(ad => ad.id)
  const idsEqAString = sourceIds.map(id => `sid.eq.${id}`).join(',')

  const dbResult = await fetchFromDB('apartments', 'sid', idsEqAString)
  const dbSids = dbResult.data?.map(item => item.sid)

  const newApartmentsIds = sourceIds.filter(id => !dbSids.includes(id))

  if (!newApartmentsIds?.length) {
    logger.warn('Nothing to save');
    return
  }

  let apartments
  await axios.all(newApartmentsIds.map((apartmentId) => axios.get(getApartmentLink(apartmentId))))
    .then(response => apartments = response.map(result => result.data))  
  
  const commonData = await getCommonData()  
  const { countries, cities, currancies, categories, sites } = commonData

  const findForeignId = (table, value, column = 'name') => table?.find(item => item[column] === value)?.id

  const insertData = apartments.map(apartment => ({
    sid: apartment.id,
    categoryId: findForeignId(categories, 'apartments'),
    siteId: findForeignId(sites, '4zida.rs'),
    countryId: findForeignId(countries, 'serbia', 'slug'),
    cityId: findForeignId(cities, apartment.cityId, 's4zidaId'),
    currancyId: findForeignId(currancies, 'EUR', 'abbr'),
    createdAtSite: apartment.createdAt,
    price: apartment.price,
    m2: apartment.m2,
    image: apartment.images?.[0]?.adDetails?.['1920x1080_fit_0_jpeg'] || apartment.images?.[0]?.adDetails?.['500x400_fit_0_jpeg'] || apartment.image?.search?.['380x0_fill_0_jpeg'],
    address: apartment.address,
    urlPage: apartment.url,
    desc: apartment.desc,
    origin: apartment,
  }))
  
  await supabaseClient
    .from('apartments')
    .insert(insertData)

  logger.success(`Added new apartments from 4zida.rs: ${insertData?.length}`);

  // const { data: filters } = await fetchData('filters')

  if (!insertData?.length) return
  
  const box = []

  for (let apartment of insertData) {
    const filters = await searchFilterByData({
      cityId: apartment.cityId,
      price: apartment.price,
      m2: apartment.m2, 
    })
    if (filters?.results?.length) {
      filters.results.forEach(filterItem => {
        const filterIndex = box.findIndex(boxItem => (
          boxItem.chatId === filterItem.chatId &&
          boxItem.apartment.sid === apartment.sid
        ))
        if (filterIndex === -1 && apartment.cityId && filterItem.isActive) {
          box.push({
            chatId: filterItem.chatId,
            apartment,
          })
        }
      })
    }
  }
  // console.log('box', box, box.length)

  // insertData.forEach(async apartment => {
  //   const filters = await searchFilterByData({
  //     cityId: apartment.cityId,
  //     price: apartment.price,
  //     m2: apartment.m2, 
  //   })
  //   console.log('filters', filters?.results?.length, {
  //     cityId: apartment.cityId,
  //     price: apartment.price,
  //     m2: apartment.m2, 
  //   })
  // })

  // return

  for (let post of box) {
    await sendPost(post.chatId, post.apartment)
  }
}

start()
