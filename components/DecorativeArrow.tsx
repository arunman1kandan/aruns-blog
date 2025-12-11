import * as React from "react"

export default function DecorativeArrow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background shadow-md ${className}`}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
