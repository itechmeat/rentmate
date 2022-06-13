require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const { connectToRedis, setToRedis, getFromRedis } = require('../libs/redis')
// const NodeCache = require( "node-cache" )
// const resourcesCache = new NodeCache()

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN)

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