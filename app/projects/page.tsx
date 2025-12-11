import Header from "@/components/Header"
import PageHeader from "@/components/PageHeader"
import { Button } from "@/components/ui/button"

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-4xl px-6 py-12 pb-24">
        <PageHeader
          title="Projects"
          description="A selection of work in AI systems, infrastructure, and developer tools."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Agent Framework",
              desc: "TypeScript framework for building reliable AI agent loops with observability.",
              tags: ["TypeScript", "LangChain", "Node.js"],
            },
            {
              title: "LLM Observability Toolkit",
              desc: "Monitor and debug LLM systems with structured logging and tracing.",
              tags: ["Observability", "DevTools", "Open Source"],
            },
            {
              title: "Infrastructure as Code Templates",
              desc: "Kubernetes and Terraform configs for agent-first microservices.",
              tags: ["Kubernetes", "Terraform", "DevOps"],
            },
            {
              title: "Prompt Engineering Dashboard",
              desc: "Web UI for version control and A/B testing of prompts and chains.",
              tags: ["Next.js", "React", "Prompt Ops"],
            },
          ].map((project, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="black" size="sm">
                  View
                </Button>
                <Button variant="white" size="sm">
                  GitHub
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
