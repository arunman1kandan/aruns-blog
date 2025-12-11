"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import ThemeSwitcher from "./ThemeSwitcher"
import { useState } from "react"

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
      <header className="w-full py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-colors duration-300 dark:border-border">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 shrink-0 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-xs font-bold text-background">AM</span>
            </div>
            <span className="font-semibold hidden sm:inline">Arun Manikandan</span>
          </Link>

          <nav className="flex items-center gap-4">
            {/* Desktop links */}
            <ul className="hidden gap-6 text-sm font-medium sm:flex text-foreground">
              <li><Link href="/" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Home</Link></li>
              <li><Link href="/projects" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Projects</Link></li>
              <li><Link href="/ai" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">AI</Link></li>
              <li><Link href="/blog" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Blog</Link></li>
              <li><Link href="/about" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">About</Link></li>
            </ul>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((s) => !s)}
              className="sm:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted transition-colors"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <ThemeSwitcher />
            <a href="mailto:arunm291003@gmail.com" className="hidden sm:inline-block">
              <Button variant="black" size="sm" className="cursor-pointer">Contact</Button>
            </a>
          </nav>

          {/* Mobile dropdown */}
          {open && (
            <div className="absolute top-full left-0 right-0 bg-card border-t border-border sm:hidden z-40">
              <div className="mx-auto max-w-4xl px-4 py-3 flex flex-col gap-2">
                <Link href="/" className="py-2 text-foreground border-b border-border">Home</Link>
                <Link href="/projects" className="py-2 text-foreground border-b border-border">Projects</Link>
                <Link href="/ai" className="py-2 text-foreground border-b border-border">AI</Link>
                <Link href="/blog" className="py-2 text-foreground border-b border-border">Blog</Link>
                <Link href="/about" className="py-2 text-foreground">About</Link>
                <div className="pt-2 flex items-center justify-between">
                  <ThemeSwitcher />
                  <a href="mailto:arunm291003@gmail.com">
                    <Button variant="black" size="sm">Contact</Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    )
  }
