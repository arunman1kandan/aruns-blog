import Header from "@/components/Header"
import PageHeader from "@/components/PageHeader"
import { Button } from "@/components/ui/button"

export default function AI() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-4xl px-6 py-12 pb-24">
        <PageHeader
          title="AI & Agents"
          description="Building intelligent systems with LLMs, agent loops, and autonomous workflows."
        />

        <div className="space-y-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground">Agent Architecture Patterns</h2>
            <p className="mt-4 text-muted-foreground">
              A comprehensive guide to designing reliable agent loops, tool augmentation, and
              error recovery strategies for production LLM systems.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="black">Read Article</Button>
              <Button variant="white">Code Examples</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground">LLM Observability Best Practices</h2>
            <p className="mt-4 text-muted-foreground">
              Strategies for monitoring, debugging, and optimizing LLM applications in production.
              Covers logging, tracing, cost tracking, and quality metrics.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="black">Read Article</Button>
              <Button variant="white">Tools</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground">Tool-Augmented LLM Workflows</h2>
            <p className="mt-4 text-muted-foreground">
              Designing effective tool integrations for LLMs, including function calling, retrieval,
              and executing code safely within agent loops.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="black">Read Article</Button>
              <Button variant="white">Reference</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
