import { NextRequest, NextResponse } from "next/server"
import { getPosts, createBlogPost, updateBlogPost, deleteBlogPost, generateSlug, BlogPost } from "@/lib/supabase-posts"
import { verifyAdminAuth } from "@/lib/auth"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Read body once
    const body = await req.json()
    const { title, category, tags, excerpt, content, adminPassword } = body

    // Verify admin auth
    if (!adminPassword || !verifyAdminAuth(adminPassword)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Parse tags - handle both string and array formats
    let parsedTags: string[] = []
    if (typeof tags === "string") {
      parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean)
    } else if (Array.isArray(tags)) {
      parsedTags = tags.map((t) => t.trim()).filter(Boolean)
    }
    
    // Add 'latest' tag if not already present
    if (!parsedTags.includes("latest")) {
      parsedTags.push("latest")
    }

    const newPost = {
      title,
      slug: generateSlug(title),
      category: category || "Tech",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      image: "/post-1.svg",
      tags: parsedTags,
      isNew: true,
      excerpt: excerpt || "",
      readingTime: Math.ceil((content?.split(" ").length || 0) / 200),
      content: content || "",
    }

    const createdPost = await createBlogPost(newPost)
    return NextResponse.json(createdPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    // Verify admin auth
    if (!body.adminPassword || !verifyAdminAuth(body.adminPassword)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updated = await updateBlogPost(id, updates)
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    // Verify admin auth
    if (!body.adminPassword || !verifyAdminAuth(body.adminPassword)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteBlogPost(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

