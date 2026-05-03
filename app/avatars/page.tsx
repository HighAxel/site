"use client";

import { useState } from "react";
import Image from "next/image";

interface Avatar {
  avatar: string;
  changed_at: string;
}

interface UserData {
  username: string;
  display_name: string;
  avatar: string;
}

export default function AvatarsPage() {
  const [userId, setUserId] = useState("");
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!userId) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.threat.best/avatars?user_id=${userId}`
      );

      const data = await response.json();

      setAvatars(data.avatars || []);
      setUser(data.user || null);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen text-white px-6 overflow-hidden">
      <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
      <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

      <section className="flex flex-col items-center pt-32 pb-20">
        <h1 className="text-5xl font-bold">
          Avatar{" "}
          <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
            History
          </span>
        </h1>

        <p className="text-gray-400 mt-5 text-lg text-center max-w-xl">
          View previously saved Discord avatars using Threat API.
        </p>

        <div className="flex gap-4 mt-10 w-full max-w-2xl">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter Discord user ID"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4BCD2]/50 transition"
          />

          <button
            onClick={search}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {user && (
          <div className="mt-10 flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 backdrop-blur">
            <Image
              src={user.avatar}
              alt="Avatar"
              width={70}
              height={70}
              className="rounded-full"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {user.display_name}
              </h2>

              <p className="text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16 w-full max-w-7xl">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur hover:border-[#D4BCD2]/40 transition"
            >
              <div className="relative">
                <Image
                  src={avatar.avatar}
                  alt="Avatar"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  {new Date(avatar.changed_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
