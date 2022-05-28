const { createClient } = require('@supabase/supabase-js')

const supabaseClient = createClient('https://nmosohgtulqkruoiqfdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3NvaGd0dWxxa3J1b2lxZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0MDQ0MzIsImV4cCI6MTk2ODk4MDQzMn0.lCuO66dotUj1geSDB8ZigvLf0HpVjRb-7nP3LAPY2os')

const fetchFromDB = async (tabel, select, query) => await supabaseClient
  .from(tabel)
  .select(select)
  .or(query)

module.exports = { supabaseClient, fetchFromDB }