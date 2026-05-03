"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BackToTop from "@/app/components/BackToTop"

export default function AvatarSearchPage() {
  const [userId, setUserId] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId.trim()) return

    router.push(`/avatars/${userId}`)
  }

  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="flex flex-col items-center justify-center text-center pt-32 pb-24">

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Avatar{" "}
            <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
              History
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl text-lg">
            Search any Discord user and browse their avatar history.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex gap-3 mt-10 flex-wrap justify-center"
          >
            <input
              type="text"
              placeholder="Enter Discord user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-[320px] px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur outline-none focus:border-[#D4BCD2]/50 transition"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
            >
              Search
            </button>
          </form>

        </section>

      </main>

      <BackToTop />
    </>
  )
}
