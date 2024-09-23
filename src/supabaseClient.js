import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uobxdmbetlkrzyqvhbiu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYnhkbWJldGxrcnp5cXZoYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMTYwMjQsImV4cCI6MjA0MjY5MjAyNH0.FZoyrkPsjKVqaeujJ3HyEh3qyPcesy_3gc6dm7bdT14"
export const supabase = createClient(supabaseUrl, supabaseKey)