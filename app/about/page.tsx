import Header from "@/components/Header"
import PageHeader from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import StatsBar from "@/components/StatsBar"

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-4xl px-6 py-12 pb-24">
        <div className="mb-8">
          <StatsBar />
        </div>

        <PageHeader title="About" description="Full-stack engineer and AI/ML enthusiast." />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold text-foreground">Background</h2>
              <p className="mt-4 text-muted-foreground">
                I'm a full-stack software engineer with a passion for building AI/ML systems and scalable infrastructure.
                Currently working as an AIML Engineer at embedUR, where I focus on designing and deploying intelligent systems.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold text-foreground">Experience & Achievements</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li>🏆 <strong>Agrithon VIT Vellore Hackathon Winner</strong></li>
                <li>🎓 <strong>Ex Vice Chairman</strong> - IEEE CIS Student Branch</li>
                <li>📋 <strong>Ex Member</strong> - IEEE MAS Council</li>
                <li>📘 <strong>IEEE Paper Published</strong> - <a href="https://ieeexplore.ieee.org/document/11019648" target="_blank" rel="noreferrer" className="underline hover:text-foreground">View on IEEE Xplore</a></li>
                <li>💼 <strong>Current</strong> - AIML Engineer @ embedUR</li>
                <li>🚀 <strong>Previous</strong> - Intern @ FarmLink/Spark Startup</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold text-foreground">Technical Expertise</h2>
              <p className="mt-4 text-muted-foreground">
                I work across the full stack with a focus on performance, scalability, and AI integration. 
                Whether it's optimizing Docker deployments, writing efficient Rust systems, or training machine learning models in Python,
                I'm driven by building robust solutions that scale.
              </p>
            </div>
          </div>

          <div>
            <div className="sticky top-6 rounded-2xl border border-border bg-card p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Languages & Tech</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "Rust",
                    "C/C++",
                    "Java",
                    "Mojo",
                    "Docker",
                    "AI/ML",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold text-foreground">Connect</h3>
                <div className="mt-3 space-y-2">
                  <a href="https://github.com/arunman1kandan/" target="_blank" rel="noreferrer">
                    <Button className="w-full" variant="black" size="sm">
                      GitHub
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/arun-manikandan-105ab5242/" target="_blank" rel="noreferrer">
                    <Button className="w-full" variant="white" size="sm">
                      LinkedIn
                    </Button>
                  </a>
                  <a href="mailto:arunm291003@gmail.com">
                    <Button className="w-full" variant="outline" size="sm">
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
