import PostCard from "./PostCard"

export default function Sidebar() {
  return (
    <aside className="w-full space-y-6">
      <div className="rounded-2xl bg-card p-4 border border-border">
        <h4 className="mb-2 font-semibold text-foreground">About</h4>
        <p className="text-sm text-muted-foreground">Full-stack engineer and AI/ML enthusiast. Currently AIML Engineer @ embedUR.</p>
        <div className="mt-4 space-y-2">
          <div className="text-xs text-muted-foreground">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border px-2 py-1 text-xs">Python</span>
            <span className="rounded-full border px-2 py-1 text-xs">Rust</span>
            <span className="rounded-full border px-2 py-1 text-xs">Docker</span>
            <span className="rounded-full border px-2 py-1 text-xs">C/C++</span>
            <span className="rounded-full border px-2 py-1 text-xs">Java</span>
            <span className="rounded-full border px-2 py-1 text-xs">AI/ML</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <a href="https://github.com/arunman1kandan/" target="_blank" rel="noreferrer" className="rounded-full border px-3 py-2 text-sm text-center hover:bg-black hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/arun-manikandan-105ab5242/" target="_blank" rel="noreferrer" className="rounded-full border px-3 py-2 text-sm text-center hover:bg-black hover:text-white">LinkedIn</a>
          <a href="mailto:arunm291003@gmail.com" className="rounded-full border px-3 py-2 text-sm text-center hover:bg-black hover:text-white">Email</a>
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="font-semibold text-foreground">Latest Post</h5>
        <PostCard
          title="Building Reliable Agent Loops"
          slug="building-reliable-agent-loops"
          category="AI"
          date="Dec 8, 2025"
          image="/post-1.jpg"
          tags={["AI", "Agents"]}
          isNew={true}
        />
      </div>
    </aside>
  )
}

