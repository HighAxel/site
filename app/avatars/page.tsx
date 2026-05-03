"use client";

import { useState } from "react";
import Image from "next/image";
import BackToTop from "@/app/components/BackToTop";

interface Avatar {
  avatar: string;
  changed_at: string;
}

export default function AvatarHistoryPage() {
  const [userId, setUserId] = useState("");
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchAvatars() {
    if (!userId) return;

    setLoading(true);
    setError("");
    setAvatars([]);

    try {
      const res = await fetch(
        `https://api.threat.best/avatars?user_id=${userId}`
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to fetch avatars");
        return;
      }

      setAvatars(data.avatars);
    } catch {
      setError("Failed to connect to API");
    }

    setLoading(false);
  }

  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="flex flex-col items-center justify-center text-center pt-32 pb-20">

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Avatar{" "}
            <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
              History
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl text-lg">
            View previously saved Discord avatars using Threat API.
          </p>

          <div className="flex gap-3 mt-10 w-full max-w-xl">

            <input
              type="text"
              placeholder="Discord User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#D4BCD2]/50 transition"
            />

            <button
              onClick={fetchAvatars}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Search"}
            </button>

          </div>

          {error && (
            <div className="mt-6 text-red-400 text-sm">
              {error}
            </div>
          )}

        </section>

        {avatars.length > 0 && (
          <section className="max-w-7xl mx-auto pb-24">

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur hover:border-[#D4BCD2]/40 transition"
                >

                  <a
                    href={avatar.avatar}
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    <Image
                      src={avatar.avatar}
                      alt="Avatar"
                      width={400}
                      height={400}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                    />

                  </a>

                  <div className="p-4 border-t border-white/10">

                    <p className="text-xs text-gray-400">
                      {new Date(avatar.changed_at).toLocaleString()}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

      </main>

      <BackToTop />
    </>
  );
}
