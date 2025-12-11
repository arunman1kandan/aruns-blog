export type Post = {  
    id: string  
    title: string  
    slug: string  
    category?: string  
    date?: string  
    image?: string  
    tags?: string[]  
    isNew?: boolean  
    excerpt?: string  
    readingTime?: number}

const calculateReadingTime = (text: string) => {  const wordsPerMinute = 200  
    const wordCount = text.split(/\\s+/).length  
    return Math.ceil(wordCount / wordsPerMinute)
}
export const posts: Post[] = [
  {
    id: "001",
    title: "Building Reliable Agent Loops",
    slug: "building-reliable-agent-loops",
    category: "AI",
    date: "Dec 8, 2025",
    image: "/post-1.svg",
    tags: ["AI", "Agents", "LLM"],
    isNew: true,
    excerpt: "Deep dive into designing fault-tolerant agent loops with retry strategies and error handling.",
    readingTime: 8,
  },
  {
    id: "002",
    title: "Observability Patterns for LLM Systems",
    slug: "observability-patterns-llm",
    category: "Engineering",
    date: "Nov 15, 2025",
    image: "/post-2.svg",
    tags: ["Observability", "LLM", "DevOps"],
    isNew: false,
    excerpt: "Comprehensive guide to logging, tracing, and monitoring LLM applications in production.",
    readingTime: 10,
  },
  {
    id: "003",
    title: "Docker Best Practices for Python ML Applications",
    slug: "docker-python-ml-apps",
    category: "DevOps",
    date: "Oct 20, 2025",
    image: "/post-3.svg",
    tags: ["Docker", "Python", "DevOps"],
    isNew: false,
    excerpt: "Optimizing Docker images and containerization strategies for machine learning workloads.",
    readingTime: 7,
  },
  {
    id: "004",
    title: "Rust for High-Performance Agent Systems",
    slug: "rust-agent-systems",
    category: "Tech",
    date: "Sep 10, 2025",
    image: "/post-4.svg",
    tags: ["Rust", "Performance", "AI"],
    isNew: false,
    excerpt: "Exploring Rust's capabilities for building low-latency, memory-efficient agent frameworks.",
    readingTime: 9,
  },
  {
    id: "005",
    title: "Full-Stack AI: From Python Backend to Production",
    slug: "fullstack-ai-production",
    category: "Tech",
    date: "Aug 5, 2025",
    image: "/post-5.svg",
    tags: ["Python", "AI", "Full-Stack"],
    isNew: false,
    excerpt: "End-to-end workflow for deploying AI models with Python, Docker, and cloud infrastructure.",
    readingTime: 12,
  },
]
