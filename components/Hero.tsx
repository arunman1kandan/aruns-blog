import TypewriterText from "./TypewriterText"

export default function Hero() {
  const phrases = [
    "AI Engineer",
    "LLM Systems Builder",
    "Agent Architect",
    "ML Infrastructure Dev",
    "Full-Stack Developer",
    "Arun Manikandan",
  ]

  return (
    <section className="group relative w-full overflow-visible rounded-2xl bg-card border border-border p-12 md:p-20 text-center animate-fade-in animate-subtle-glow">

      {/* Main content */}
      <div className="space-y-4">
        <div className="text-sm font-semibold text-muted-foreground tracking-wider uppercase animate-slide-in">
          Welcome to my corner of the web
        </div>

        <div className="min-h-24 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            <TypewriterText
              phrases={phrases}
              speed={80}
              deleteSpeed={40}
              delayBetweenPhrases={2000}
            />
          </h1>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in">
          Building intelligent systems, crafting scalable infrastructure, and exploring the intersection of AI and software engineering.
        </p>
      </div>
    </section>
  )
}

