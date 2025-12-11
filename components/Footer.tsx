export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 text-center animate-fade-in">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-center gap-6 mb-6">
          <a
            href="https://github.com/arunman1kandan/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/arun-manikandan-105ab5242/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:arunm291003@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Email
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2025 Arun Manikandan. Building AI systems and sharing knowledge.
        </p>
      </div>
    </footer>
  )
}
