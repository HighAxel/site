"use client";

import { useEffect, useMemo, useState } from "react";

import BackToTop from "@/app/components/BackToTop";

import {
  MessageCircle,
  Globe,
  Send,
} from "lucide-react";

const TEAM = [
  {
    id: "1475924756418134269",
    role: "Developer",
    quote: "Love Sex & Dreams.",
    connections: [
      {
        type: "discord",
        url: "https://discord.com/users/1475924756418134269",
      },
      {
        type: "telegram",
        url: "https://t.me/bossaxel",
      },
    ],
  },

  {
    id: "1492942644119343114",
    role: "Developer",
    quote:
      "E-sexing with threat's code.",
    connections: [
      {
        type: "discord",
        url: "https://discord.com/users/1492942644119343114",
      },
      {
        type: "telegram",
        url: "https://t.me/eswagged",
      },
    ],
  },

  {
    id: "1492554491864682506",
    role: "Owner",
    quote:
      "theres only a couple real friends in your life",
    connections: [
      {
        type: "discord",
        url: "https://discord.com/users/1492554491864682506",
      },
      {
        type: "telegram",
        url: "https://t.me/noxyx",
      },
    ],
  },
];

function getAvatar(user: any) {
  if (!user?.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/0.png`;
  }

  const ext = user.avatar.startsWith("a_")
    ? "gif"
    : "png";

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}

function Icon({ type }: { type: string }) {
  const base = "w-4 h-4";

  switch (type) {
    case "discord":
      return <MessageCircle className={base} />;

    case "telegram":
      return <Send className={base} />;

    case "website":
      return <Globe className={base} />;

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



export default function TeamPage() {
  const [members, setMembers] = useState<
    Record<string, any>
  >({});

  const ids = useMemo(
    () => TEAM.map((m) => m.id),
    []
  );

  useEffect(() => {
    const ws = new WebSocket(
      "wss://api.lanyard.rest/socket"
    );

    let heartbeat: any;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.op === 1) {
        heartbeat = setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, msg.d.heartbeat_interval);

        ws.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_ids: ids },
          })
        );
      }

      if (msg.t === "INIT_STATE")
        setMembers(msg.d);

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
        {/* Header */}
        <section className="text-center pt-32 pb-20">
          <h1 className="text-4xl font-bold">
            Meet the Team
          </h1>
        </section>

        {/* Cards */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 pb-24">
          {TEAM.map((t) => {
            const m = members[t.id];

            const user = m?.discord_user;

            const activity =
              m?.activities?.find(
                (a: any) => a.type === 0
              );

            return (
              <div
                key={t.id}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-6
                  backdrop-blur-xl
                "
              >
                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user
                        ? getAvatar(user)
                        : "https://cdn.discordapp.com/embed/avatars/0.png"
                    }
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {user?.global_name ||
                        user?.username ||
                        "Loading..."}
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

                {/* Quote */}
                <div className="mt-5 rounded-xl bg-white/[0.02] border border-white/5 p-4">
                  <p className="text-sm text-gray-300 italic">
                    “{t.quote}”
                  </p>
                </div>

                {/* Playing */}
                {activity &&
                  !m?.listening_to_spotify && (
                    <div className="mt-3 text-gray-400">
                      Playing {activity.name}
                    </div>
                  )}

                
                

                {/* Connections */}
                <div className="mt-5 flex gap-2 flex-wrap">
                  {t.connections.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      className="
                        flex items-center gap-2
                        px-3.5 py-2
                        rounded-xl
                        bg-[#111113]
                        border border-white/[0.05]
                        text-[13px]
                        text-[#c7c7cf]
                        hover:border-[#D4BCD2]/30
                        hover:bg-[#151518]
                        transition-all duration-200
                      "
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