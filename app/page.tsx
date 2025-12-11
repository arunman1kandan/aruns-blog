import Header from "../components/Header"
import Hero from "../components/Hero"
import BlogSection from "../components/BlogSection"
import Sidebar from "../components/Sidebar"
import StatsBar from "../components/StatsBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-6 pb-24">
        <div className="mt-6 mb-8">
          <StatsBar />
        </div>
        {/* Hero - Full Width and Centered */}
        <div className="mb-20 mt-12">
          <Hero />
        </div>

        {/* Blog Section - Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <BlogSection />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
