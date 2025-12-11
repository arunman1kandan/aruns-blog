import { supabase } from "./supabase"

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  date: string
  image: string
  tags: string[]
  isNew?: boolean
  excerpt: string
  readingTime: number
  content: string
  author_id?: string
  created_at?: string
  updated_at?: string
}

// Get all posts
export async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data || []
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching post:", error)
    return null
  }

  return data
}

// Create a new post
export async function createBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select()
    .single()

  if (error) {
    console.error("Error creating post:", error)
    throw error
  }

  return data
}

// Update a post
export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating post:", error)
    throw error
  }

  return data
}

// Delete a post
export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}

// Generate URL-safe slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 50)
}
