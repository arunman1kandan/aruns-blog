"use client"

import Header from "@/components/Header"
import { posts } from "@/lib/posts"
import { useEffect, useState } from "react"

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const staticPost = posts.find((p) => p.slug === params.slug)
    if (staticPost) {
      setPost(staticPost)
      setLoading(false)
      return
    }

    fetch("/api/posts")
      .then((res) => res.json())
      .then((allPosts) => {
        const found = allPosts.find((p: any) => p.slug === params.slug)
        setPost(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
          <p className="text-muted-foreground">Post not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-6 py-12 pb-24">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 link-underline"
        >
          ← Back to Blog
        </a>

        <article className="space-y-6 animate-fade-in">
          <div className="space-y-4 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              {post.category && (
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground">
                  {post.category}
                </span>
              )}
              {post.isNew && (
                <span className="rounded-full bg-black text-white px-2 py-1 text-xs font-semibold">New</span>
              )}
            </div>

            <h1 className="text-5xl font-bold leading-tight text-foreground">{post.title}</h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {post.date && <span>{post.date}</span>}
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            {(post.content || generateSampleContent(post))
              .split("\n\n")
              .map((paragraph: string, idx: number) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)?.[0].length || 2
                  const text = paragraph.replace(/^#+\s/, "")
                  const className = {
                    1: "text-4xl font-bold mt-8 mb-4",
                    2: "text-3xl font-bold mt-6 mb-3",
                    3: "text-2xl font-bold mt-4 mb-2",
                  }[level] || "text-xl font-bold mt-3 mb-2"

                  return (
                    <h2 key={idx} className={className}>
                      {text}
                    </h2>
                  )
                }

                if (paragraph.startsWith("-")) {
                  return (
                    <ul key={idx} className="space-y-2 ml-4 list-disc">
                      {paragraph
                        .split("\n")
                        .filter((line) => line.startsWith("-"))
                        .map((line, i) => (
                          <li key={i} className="text-muted-foreground leading-relaxed">
                            {line.replace(/^-\s/, "")}
                          </li>
                        ))}
                    </ul>
                  )
                }

                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={idx} className="space-y-2 ml-4 list-decimal">
                      {paragraph
                        .split("\n")
                        .filter((line) => line.match(/^\d+\./))
                        .map((line, i) => (
                          <li key={i} className="text-muted-foreground leading-relaxed">
                            {line.replace(/^\d+\.\s/, "")}
                          </li>
                        ))}
                    </ol>
                  )
                }

                return (
                  <p key={idx} className="text-muted-foreground leading-relaxed text-lg">
                    {paragraph}
                  </p>
                )
              })}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground hover:bg-muted transition-colors link-underline"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">More Articles</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {posts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((p) => (
                <a
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="rounded-lg border border-border p-4 hover:bg-card hover:shadow-md transition-all cursor-pointer"
                >
                  <h4 className="font-semibold text-foreground">{p.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{p.date}</p>
                  {p.tags && (
                    <div className="mt-2 flex gap-2">
                      {p.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function generateSampleContent(post: any): string {
  return `
# ${post.title}

This is a comprehensive guide to ${post.excerpt?.toLowerCase() || "the topic"}.

## Introduction
${post.excerpt}

## Key Points
- Building reliable systems requires careful design and testing
- Iteration and feedback loops are essential for improvement
- Documentation helps both current and future maintainers

## Implementation Details
The actual implementation of this concept involves several steps:

1. **Planning**: Define clear objectives and constraints
2. **Design**: Create architectural blueprints
3. **Implementation**: Write clean, maintainable code
4. **Testing**: Verify correctness with comprehensive tests
5. **Deployment**: Roll out gradually with monitoring

## Best Practices
- Always consider edge cases
- Write clear, self-documenting code
- Keep dependencies minimal
- Monitor and observe production behavior

## Conclusion
This topic is crucial for modern engineering. Continue learning and iterating on your skills.

## References
- [Learn more](https://example.com)
- [Documentation](https://example.com)
`.trim()
}
