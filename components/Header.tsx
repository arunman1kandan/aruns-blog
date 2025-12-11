import Link from "next/link"
import { Button } from "./ui/button"
import ThemeSwitcher from "./ThemeSwitcher"

export default function Header() {
  return (
    <header className="w-full py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-colors duration-300 dark:border-border">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 shrink-0 rounded-md bg-foreground flex items-center justify-center">
            <span className="text-xs font-bold text-background">AM</span>
          </div>
          <span className="font-semibold hidden sm:inline">Arun Manikandan</span>
        </Link>

        <nav className="flex items-center gap-4">
          <ul className="hidden gap-6 text-sm font-medium sm:flex text-foreground">
            <li><Link href="/" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Home</Link></li>
            <li><Link href="/projects" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Projects</Link></li>
            <li><Link href="/ai" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">AI</Link></li>
            <li><Link href="/blog" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">Blog</Link></li>
            <li><Link href="/about" className="hover:text-muted-foreground transition-colors cursor-pointer link-underline">About</Link></li>
          </ul>
          <ThemeSwitcher />
          <a href="mailto:arunm291003@gmail.com">
            <Button variant="black" size="sm" className="cursor-pointer">Contact</Button>
          </a>
        </nav>
      </div>
    </header>
  )
}
