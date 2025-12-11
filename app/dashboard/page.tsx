"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email?: string
  subscribed_to_updates: boolean
  following: string[]
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!data.session) {
        router.push("/auth")
        return
      }

      setUser(data.session.user)

      // Fetch user profile
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setSubscribed(profileData.subscribed_to_updates)
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from("user_profiles")
          .insert([
            {
              id: data.session.user.id,
              email: data.session.user.email,
              subscribed_to_updates: false,
              following: [],
            },
          ])
          .select()
          .single()

        if (newProfile) {
          setProfile(newProfile)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleToggleSubscription = async () => {
    if (!user || !profile) return

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ subscribed_to_updates: !subscribed })
        .eq("id", user.id)

      if (!error) {
        setSubscribed(!subscribed)
      }
    } catch (error) {
      console.error("Error updating subscription:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-6 py-12">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-2xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-border px-4 py-2 text-sm cursor-pointer hover:bg-muted transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Account Info</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Member since:</span>{" "}
                {new Date(profile?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Subscription Settings */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Subscribe to Blog Updates</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when new blog posts are published
                </p>
              </div>
              <button
                onClick={handleToggleSubscription}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  subscribed ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    subscribed ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Following */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Following</h2>
            {profile?.following && profile.following.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.following.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full border border-border px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Not following any topics yet
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
