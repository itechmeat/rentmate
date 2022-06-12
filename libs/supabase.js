const { createClient } = require('@supabase/supabase-js')
const { connectToRedis, setToRedis, getFromRedis } = require('../libs/redis')
// const NodeCache = require( "node-cache" )
// const resourcesCache = new NodeCache()

const supabaseClient = createClient('https://nmosohgtulqkruoiqfdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3NvaGd0dWxxa3J1b2lxZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0MDQ0MzIsImV4cCI6MTk2ODk4MDQzMn0.lCuO66dotUj1geSDB8ZigvLf0HpVjRb-7nP3LAPY2os')

const fetchData = async (tabel, select) => supabaseClient
  .from(tabel)
  .select(select)

const fetchCommonData = async () => {
  const [
    { data: countries },
    { data: cities },
    { data: currancies },
    { data: categories },
    { data: sites },
  ] = await Promise.all([
    fetchData('countries'),
    fetchData('cities'),
    fetchData('currancies'),
    fetchData('categories'),
    fetchData('sites'),
  ])
  
  return {
    countries,
    cities,
    currancies,
    categories,
    sites,
  }
}

const saveCommonData = async () => {
  connectToRedis()
  const data = await fetchCommonData()
  await setToRedis('settings', JSON.stringify(data))
}

const getCommonData = async () => {
  connectToRedis()
  const settings = await getFromRedis('settings')
  return JSON.parse(settings)
}

const fetchFromDB = async (tabel, select, query) => await supabaseClient
  .from(tabel)
  .select(select)
  .or(query)

module.exports = { supabaseClient, fetchData, fetchCommonData, saveCommonData, getCommonData, fetchFromDB }