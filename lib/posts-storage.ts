import fs from "fs"
import path from "path"

export interface BlogPost {
  id: string
  title: string
  slug: string
  category?: string
  date?: string
  image?: string
  tags?: string[]
  isNew?: boolean
  excerpt?: string
  readingTime?: number
  content?: string
}

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json")

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(POSTS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read all posts from storage
export function readPosts(): BlogPost[] {
  ensureDataDir()
  if (!fs.existsSync(POSTS_FILE)) {
    return []
  }
  const data = fs.readFileSync(POSTS_FILE, "utf-8")
  return JSON.parse(data)
}

// Write posts to storage
export function writePosts(posts: BlogPost[]) {
  ensureDataDir()
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2))
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = readPosts()
  return posts.find((p) => p.slug === slug)
}

// Create a new post
export function createPost(post: BlogPost) {
  const posts = readPosts()
  posts.push(post)
  writePosts(posts)
  return post
}

// Update an existing post
export function updatePost(id: string, updates: Partial<BlogPost>) {
  const posts = readPosts()
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) throw new Error("Post not found")
  posts[index] = { ...posts[index], ...updates }
  writePosts(posts)
  return posts[index]
}

// Delete a post
export function deletePost(id: string) {
  const posts = readPosts()
  const filtered = posts.filter((p) => p.id !== id)
  writePosts(filtered)
}

// Generate a unique slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
