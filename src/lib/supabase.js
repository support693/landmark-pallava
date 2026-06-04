import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://wzyhniyvwuqlinhwvlja.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWhuaXl2d3VxbGluaHd2bGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTk3OTQsImV4cCI6MjA5NjEzNTc5NH0.wSNFjGpy8f2z19MLSGEZtK2TiDjFQyDWOmCBQ8O40Ag'
)
