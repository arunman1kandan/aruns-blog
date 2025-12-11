"use client"

import Image from "next/image"
import DecorativeArrow from "./DecorativeArrow"
import Link from "next/link"
import { useInView } from "@/lib/hooks"

type PostCardProps = {
  title: string
  slug?: string
  category?: string
  date?: string
  image?: string
  tags?: string[]
  isNew?: boolean
  excerpt?: string
  readingTime?: number
}

export default function PostCard({
  title,
  slug,
  category,
  date,
  image,
  tags,
  isNew,
  excerpt,
  readingTime,
}: PostCardProps) {
  const { ref, isInView } = useInView()

  return (
    <Link href={slug ? `/blog/${slug}` : "#"}>
      <div ref={ref} className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <article className="relative w-full overflow-hidden rounded-2xl bg-card p-4 shadow-sm border border-border hover:shadow-lg hover:border-foreground transition-all duration-300 cursor-pointer group">
        <div className="relative h-40 w-full rounded-lg overflow-hidden bg-muted">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : null}
          <div className="absolute -right-4 bottom-[-18px] group-hover:opacity-80 transition-opacity duration-300">
            <DecorativeArrow />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            {category ? (
              <span className="inline-block rounded-full border px-3 py-1 text-xs text-foreground">{category}</span>
            ) : null}
            {isNew && (
              <span className="inline-block rounded-full bg-black text-white px-2 py-1 text-xs font-semibold">New</span>
            )}
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-muted-foreground transition-colors duration-200">{title}</h3>
          {excerpt && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{excerpt}</p>}
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            {date && <span>{date}</span>}
            {date && readingTime && <span>•</span>}
            {readingTime && <span>{readingTime} min read</span>}
          </div>

          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-foreground transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        </article>
      </div>
    </Link>
  )
}
