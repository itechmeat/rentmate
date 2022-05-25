'use strict'
// const fastify = require('fastify')
const axios = require('axios')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient('https://nmosohgtulqkruoiqfdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3NvaGd0dWxxa3J1b2lxZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0MDQ0MzIsImV4cCI6MTk2ODk4MDQzMn0.lCuO66dotUj1geSDB8ZigvLf0HpVjRb-7nP3LAPY2os')

const getCityLink = (city) => {
  // https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=1
  return `https://api.4zida.rs/v6/search/apartments?for=rent&sort=createdAtDesc&page=1&placeIds%5B%5D=${city}`
}

const getApartmentLink = (id) => {
  // https://api.4zida.rs/v5/eds/628d0d962544f858b64afa5d
  return `https://api.4zida.rs/v5/eds/${id}`
}

const start = async () => {
  const { data } = await axios.get(getCityLink(1))
  const adsIds = data.ads.map(ad => ad.id)
  const idsEqArr = adsIds.map(id => `sid.eq.${id}`)
  const idsEqAString = idsEqArr.join(',')

  const dbResult = await supabase
    .from('apartments')
    .select()
    .or(idsEqAString)
  const dbSids = dbResult.data?.map(item => item.sid)
  console.log(new Date().toLocaleTimeString())

  for (let item of data.ads) {
    if (!dbSids.includes(item.id)) {
      console.info('NEW', item.id)
      try {
        const { data } = await axios.get(getApartmentLink(item.id))

        if (data) {
          await supabase
            .from('apartments')
            .insert([
              { 
                sid: data.id,
                source: '4zida.rs',
                type: data.type,
                city_id: data.cityId,
                created_at_source: data.createdAt,
                price: data.price,
                m2: data.m2,
                image: data.images?.[0]?.adDetails?.['1920x1080_fit_0_webp'] || data.images?.[0]?.adDetails?.['500x400_fit_0_webp'] || item.image?.search?.['380x0_fill_0_webp'],
                address: data.address,
                url_source: data.url,
                desc: data.desc,
                origin: data
              }
            ])
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.warn('OLD')
    }
  }
}

start()
