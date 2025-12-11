import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper to get the current user session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error("Error getting session:", error)
    return null
  }
  return data.session
}

// Helper to get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error("Error getting user:", error)
    return null
  }
  return data.user
}
