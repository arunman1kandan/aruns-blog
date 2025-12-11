"use client"

import { posts } from "@/lib/posts"
import PostCard from "./PostCard"
import { useInView } from "@/lib/hooks"

export default function BlogSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="blog" ref={ref} className={`w-full py-12 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thoughts on agent architecture, LLM systems, and engineering patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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

      <div className="mt-8 text-center">
        <a className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm" href="#all-posts">
          View All Articles
        </a>
      </div>
    </section>
  )
}
