"use client"

import { useState, useMemo, useEffect } from "react"
import Header from "@/components/Header"
import PageHeader from "@/components/PageHeader"
import PostCard from "@/components/PostCard"
import { posts as staticPosts } from "@/lib/posts"
import { useInView } from "@/lib/hooks"

export default function Blog() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [allPosts, setAllPosts] = useState(staticPosts)

  // Fetch API posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        if (res.ok) {
          const apiPosts = await res.json()
          // Merge API posts with static posts (API posts first as they're newer)
          const merged = [...apiPosts, ...staticPosts]
          setAllPosts(merged)
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      }
    }
    fetchPosts()

    // Listen for cross-tab/post updates and refetch when admin updates posts
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "posts-updated") {
        fetchPosts()
      }
    }
    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // Get unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [allPosts])

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags?.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags])

  const { ref: gridRef, isInView: gridInView } = useInView()

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-4xl px-6 py-12 pb-24">
        <PageHeader
          title="Blog"
          description="Technical writing on AI systems, engineering patterns, and infrastructure."
        />

        {/* Tag Filter Section */}
        <div className="mb-10 animate-fade-in">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Filter by Tag or Search</h3>
          </div>
          <div className="mb-4">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tag..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white border border-black"
                    : "border border-border text-foreground hover:border-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="rounded-full px-3 py-1.5 text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
          {selectedTags.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground animate-scale-in">
              Showing {filteredPosts.length} of {allPosts.length} articles
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div ref={gridRef} className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              category={post.category}
              date={post.date}
              image={post.image}
              tags={post.tags}
              isNew={post.isNew}
              excerpt={post.excerpt}
              readingTime={post.readingTime}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center animate-fade-in">
            <p className="text-muted-foreground">No posts found with the selected tags.</p>
          </div>
        )}
      </main>
    </div>
  )
}
