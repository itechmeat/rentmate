const { createClient } = require('@supabase/supabase-js')
// const NodeCache = require( "node-cache" )
// const resourcesCache = new NodeCache()

const supabaseClient = createClient('https://nmosohgtulqkruoiqfdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3NvaGd0dWxxa3J1b2lxZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0MDQ0MzIsImV4cCI6MTk2ODk4MDQzMn0.lCuO66dotUj1geSDB8ZigvLf0HpVjRb-7nP3LAPY2os')

// const fetchCities = async () => {
//   const cities = resourcesCache.get('cities')
//   console.log('$$$', cities,  resourcesCache.has('cities'))

//   if (cities) {
//     console.log('chached!!!!', cities.length)
//     return cities
//   }

//   const result = await supabaseClient
//     .from('cities')
//     .select()

//   resourcesCache.set('cities', result.body, 10000)
//   console.log('loaded!!!!', result.body.length)
//   console.log('from cache!!!!', resourcesCache.get('cities')?.length)

//   return result.body
// }

const fetchData = async (tabel, select) => supabaseClient
  .from(tabel)
  .select(select)

const fetchFromDB = async (tabel, select, query) => await supabaseClient
  .from(tabel)
  .select(select)
  .or(query)

module.exports = { supabaseClient, fetchData, fetchFromDB }