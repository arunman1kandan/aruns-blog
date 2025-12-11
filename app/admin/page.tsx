"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"

export default function AdminPanel() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [posts, setPosts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "Tech",
    tags: "",
    excerpt: "",
    content: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password) {
      setIsAuthenticated(true)
      localStorage.setItem("adminPassword", password)
      fetchPosts()
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts")
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? "/api/posts" : "/api/posts"
      const method = editingId ? "PUT" : "POST"

      const payload = {
        ...(editingId && { id: editingId }),
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
        adminPassword: password,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setFormData({ title: "", category: "Tech", tags: "", excerpt: "", content: "" })
        setEditingId(null)
        fetchPosts()
        try {
          // notify other tabs/pages that posts changed
          localStorage.setItem("posts-updated", Date.now().toString())
        } catch (e) {
          /* ignore */
        }
      } else {
        alert("Failed to save post")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Error saving post")
    }
  }

  const handleEdit = (post: any) => {
    setEditingId(post.id)
    setFormData({
      title: post.title,
      category: post.category || "Tech",
      tags: post.tags?.join(", ") || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminPassword: password }),
      })

      if (res.ok) {
        fetchPosts()
        try {
          localStorage.setItem("posts-updated", Date.now().toString())
        } catch (e) {
          /* ignore */
        }
      } else {
        alert("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-6 py-12">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
            <p className="text-muted-foreground mb-6">Enter your password to access the admin panel.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-black text-white px-3 py-2 cursor-pointer hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-6 py-12 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem("adminPassword")
            }}
            className="rounded-md border border-border px-4 py-2 text-sm cursor-pointer hover:bg-muted transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <div className="mb-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Post title"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-border bg-background px-3 py-2"
                >
                  <option>Tech</option>
                  <option>AI</option>
                  <option>DevOps</option>
                  <option>Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, AI, LLM"
                  className="w-full rounded-md border border-border bg-background px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief summary of the post"
                rows={2}
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Full post content (plain text or markdown)"
                rows={8}
                className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
              />
              <p className="mt-2 text-xs text-muted-foreground">Tip: You can write Markdown. Install optional editor packages for a richer editing UI.</p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-md bg-black text-white px-4 py-2 font-semibold cursor-pointer hover:bg-gray-800 transition-colors"
              >
                {editingId ? "Update Post" : "Create Post"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ title: "", category: "Tech", tags: "", excerpt: "", content: "" })
                  }}
                  className="flex-1 rounded-md border border-border px-4 py-2 font-semibold cursor-pointer hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold mb-6">Your Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Create one above!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-start justify-between gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                    <div className="mt-2 flex gap-2">
                      {post.tags?.map((tag: string) => (
                        <span key={tag} className="inline-block rounded-full border border-border px-2 py-0.5 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded-md border border-border px-3 py-1 text-sm cursor-pointer hover:bg-muted transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
