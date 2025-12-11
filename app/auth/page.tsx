"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        setSuccess("Signed in successfully!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        setSuccess("Account created! Check your email to confirm.")
        setEmail("")
        setPassword("")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-md px-6 py-12">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isLogin
              ? "Access your dashboard and subscribe to updates"
              : "Join to get notified about new blog posts"}
          </p>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-black text-white px-3 py-2 font-semibold cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                  setSuccess("")
                }}
                className="text-black font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
