"use client";

import { useEffect, useMemo, useState } from "react";
import BackToTop from "@/app/components/BackToTop";


const TEAM = [
  {
    id: "1475924756418134269",
    role: "Developer",
    quote: "Love Sex & Dreams.",
    connections: [
      { type: "discord", url: "https://discord.com/users/1475924756418134269" },
      { type: "website", url: "https://your-site.com" },
      { type: "telegram", url: "https://t.me/bossaxel" },
    ],
  },
  {
    id: "1492942644119343114",
    role: "Designer",
    quote: "Design isn't how it looks, it's how it feels.",
    connections: [
      { type: "discord", url: "https://discord.com/users/1492942644119343114" },
      { type: "telegram", url: "https://t.me/eswagged" },
    ],
  },
  {
    id: "1492554491864682506",
    role: "Owner",
    quote: "theres only a couple real friends in your life",
    connections: [
      { type: "discord", url: "https://discord.com/users/1492554491864682506" },
      { type: "telegram", url: "https://t.me/noxyx" },
    ],
  },
];


function getAvatar(user: any) {
  if (!user?.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/0.png`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}



function Icon({ type }: { type: string }) {
  const base = "w-4 h-4";

  switch (type) {
    case "discord":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4.5A17.6 17.6 0 0 0 16 3l-.3.6a16.4 16.4 0 0 1 4.1 1.3c-1.7 1.3-3.2 2.8-4.6 4.5-1.1-.7-2.3-1.2-3.6-1.5l-.2.7c1.1.3 2.2.8 3.2 1.4-.6.9-1.1 1.8-1.6 2.7-1-.5-2.1-.9-3.2-1.2l-.2.7c1 .3 2 .7 2.9 1.2-.7 1.4-1.3 2.9-1.8 4.5 1.6 1.1 3.4 1.7 5.3 1.7s3.7-.6 5.3-1.7c-.5-1.6-1.1-3.1-1.8-4.5.9-.5 1.9-.9 2.9-1.2l-.2-.7c-1.1.3-2.2.7-3.2 1.2-.5-.9-1-1.8-1.6-2.7 1-.6 2.1-1.1 3.2-1.4l-.2-.7c-1.3.3-2.5.8-3.6 1.5 1.4-1.7 2.9-3.2 4.6-4.5z"/>
        </svg>
      );

    case "website":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        </svg>
      );

    case "telegram":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.9 16.2 9.7 20c.4 0 .6-.2.9-.4l2.2-2.1 4.5 3.3c.8.4 1.4.2 1.6-.7l2.9-13.6c.3-1.1-.4-1.6-1.3-1.3L1.7 9.3c-1.1.4-1.1 1-.2 1.3l4.6 1.4 10.7-6.7c.5-.3 1-.1.6.3"/>
        </svg>
      );

    default:
      return null;
  }
}


function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SpotifyProgress({ spotify }: { spotify: any }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const start = spotify.timestamps.start;
  const end = spotify.timestamps.end;

  const duration = end - start;
  const elapsed = Math.min(now - start, duration);

  const progress = Math.min(100, (elapsed / duration) * 100);

  return (
    <div className="mt-3">

      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D4BCD2] transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(duration)}</span>
      </div>

    </div>
  );
}


export default function TeamPage() {
  const [members, setMembers] = useState<Record<string, any>>({});
  const ids = useMemo(() => TEAM.map((m) => m.id), []);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");
    let heartbeat: any;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.op === 1) {
        heartbeat = setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, msg.d.heartbeat_interval);

        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ids } }));
      }

      if (msg.t === "INIT_STATE") setMembers(msg.d);

      if (msg.t === "PRESENCE_UPDATE") {
        setMembers((prev) => ({
          ...prev,
          [msg.d.discord_user.id]: msg.d,
        }));
      }
    };

    return () => {
      clearInterval(heartbeat);
      ws.close();
    };
  }, [ids]);

  return (
    <>
      <main className="relative min-h-screen text-white px-6">

        <section className="text-center pt-32 pb-20">
          <h1 className="text-4xl font-bold">Meet the Team</h1>
        </section>

        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 pb-24">

          {TEAM.map((t) => {
            const m = members[t.id];
            const user = m?.discord_user;
            const activity = m?.activities?.find((a: any) => a.type === 0);

            return (
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-4">
                  <img
  src={user ? getAvatar(user) : "https://cdn.discordapp.com/embed/avatars/0.png"}
  className="w-16 h-16 rounded-full"
/>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {user?.global_name || user?.username || "Loading..."}
                    </h3>

                    {user && (
                      <div className="text-xs text-gray-500">
                        @{user.username}
                      </div>
                    )}

                    <p className="text-gray-400 text-sm mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white/[0.02] border border-white/5 p-4">
                  <p className="text-sm text-gray-300 italic">
                    “{t.quote}”
                  </p>
                </div>

                {activity && !m?.listening_to_spotify && (
                  <div className="mt-3 text-gray-400">
                    Playing {activity.name}
                  </div>
                )}

                {m?.listening_to_spotify && (
  <div className="mt-5 bg-[#2b2d31] p-4 rounded-xl border border-white/5">

    <div className="flex gap-4 items-center">

      <div className="relative">
        <img
          src={m.spotify.album_art_url}
          className="w-14 h-14 rounded-md object-cover"
        />

        <div className="absolute inset-0 rounded-md bg-[#D4BCD2]/10 blur-md opacity-50" />
      </div>

      <div className="flex-1">
        <div className="text-sm text-white font-medium leading-tight">
          {m.spotify.song}
        </div>

        <div className="text-xs text-gray-400">
          {m.spotify.artist}
        </div>

        <div className="text-[10px] text-gray-500 mt-1">
          {m.spotify.album}
        </div>
      </div>

      <svg
        className="w-5 h-5 text-green-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.6 14.5c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.8-9.3-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-1 7.5-.6 10.3 1.1.3.2.4.6.2.8zm1.3-2.9c-.2.4-.7.5-1.1.3-2.9-1.8-7.3-2.3-10.7-1.1-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.8-1.2 8.7-.6 11.9 1.3.4.2.5.7.3 1zm.1-3c-3.4-2-9-2.2-12.2-1.1-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.6-1.2 9.7-1 13.5 1.2.5.3.6.9.3 1.3-.3.4-.9.6-1.3.3z"/>
      </svg>

    </div>

    <SpotifyProgress spotify={m.spotify} />

  </div>
)}
                <div className="mt-5 flex gap-2 flex-wrap">
                  {t.connections.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs hover:border-[#D4BCD2]/40 transition"
                    >
                      <Icon type={c.type} />
                      {c.type}
                    </a>
                  ))}
                </div>

              </div>
            );
          })}

        </section>

      </main>

      <BackToTop />
    </>
  );
}