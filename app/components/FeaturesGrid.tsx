"use client";

import { useEffect, useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import { FaLastfm } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

const BOT_AVATAR = "/assets/site_logo.png";

const AXEL_ID = "1475924756418134269";
const SWAG_ID = "1492942644119343114";
const NOX_ID = "1492554491864682506";

const features = () => {
  const [axelAvatar, setAxelAvatar] = useState("");
  const [swagAvatar, setSwagAvatar] = useState("");
  const [noxAvatar, setNoxAvatar] = useState("");

  useEffect(() => {
    const fetchAvatar = async (id: string, setter: any) => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${id}`
        );
        const json = await res.json();

        const user = json.data.discord_user;

        const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        setter(avatar);
      } catch {
        setter("");
      }
    };

    fetchAvatar(AXEL_ID, setAxelAvatar);
    fetchAvatar(SWAG_ID, setSwagAvatar);
    fetchAvatar(NOX_ID, setNoxAvatar);
  }, []);

  return [
    {
      title: "Advanced Moderation",
      description: "Keep your server safe with powerful moderation tools.",
      icon: <FaWandMagicSparkles className="w-5 h-5" />,
      preview: (
        <div className="mt-5 text-xs space-y-3">
          <div className="flex items-center gap-2">
            <img src={BOT_AVATAR} className="w-6 h-6 rounded-full" />
            <span className="text-gray-300 font-medium">threat</span>
            <span className="text-[10px] text-gray-500">just now</span>
          </div>

          <div className="bg-gradient-to-br from-[#2b2d31] to-[#232428] rounded-lg p-4 border border-white/5 shadow-inner">
            <div className="flex justify-between mb-2">
              <span className="text-white text-sm font-semibold">
                Moderation Log
              </span>
              <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-[2px] rounded">
                FLAGGED
              </span>
            </div>

            <div className="text-gray-400 text-[12px]">
              Message deleted • User:{" "}
              <span className="text-gray-200">alex</span>
            </div>

            <div className="mt-2 text-[11px] text-red-400">
              Reason: spam link
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-gray-500">
              Auto-moderation triggered
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "VoiceMaster",
      description: "Dynamic voice channels with full control.  Manage your voice channel with intuitive controls — lock, invite, adjust bitrate, and more in real time.",
      icon: (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#D4BCD2]"
    fill="none"
    stroke="currentColor"
  >
    <path strokeWidth="2" d="M12 1v22M5 8v8M19 8v8" />
  </svg>
),
      preview: (
        <div className="mt-4 text-xs">
          <div className="flex items-center gap-2 mb-3">
            <img src={BOT_AVATAR} className="w-6 h-6 rounded-full" />
            <span className="text-gray-300 font-medium">threat</span>
            <span className="text-[10px] text-gray-500">live</span>
          </div>

          <div className="bg-[#2b2d31] rounded-md border border-white/5 p-3 space-y-3">

            <div className="text-gray-400 text-[11px] leading-relaxed">

            </div>

            <div className="text-gray-500 text-[10px]">
              ▼ VOICE CHANNELS
            </div>

            <div className="bg-white/[0.04] px-2 py-1 rounded flex justify-between items-center">
              <span className="text-gray-300">axel's channel</span>
              <span className="text-[10px] text-green-400">LIVE</span>
            </div>

            <div className="space-y-2">

              {/* speaking user 1 */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={axelAvatar || "/assets/site_logo.png"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-70" />
                </div>
                <span className="text-white">axel</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={swagAvatar || "/assets/site_logo.png"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-60 [animation-delay:0.6s]" />
                </div>
                <span className="text-white">swag</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={noxAvatar || "/assets/site_logo.png"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-60 [animation-delay:0.6s]" />
                </div>
                <span className="text-white">nox</span>
              </div>

            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Smart Configuration",
      description: "Customize every feature easily.",
      icon: <GearIcon className="w-5 h-5" />,
      preview: (
  <div className="mt-5 text-xs space-y-3">

    {/* header */}
    <div className="flex items-center gap-2">
      <img src={BOT_AVATAR} className="w-6 h-6 rounded-full" />
      <span className="text-gray-300 font-medium">threat</span>
      <span className="text-[10px] text-gray-500">dashboard</span>
    </div>

    {/* outer glow wrapper */}
    <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-[#D4BCD2]/20 to-transparent">

      <div className="bg-[#2b2d31] rounded-xl p-4 space-y-4">

        {/* title row */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-white text-sm font-semibold">
              Server Configuration
            </div>
            <div className="text-gray-500 text-[10px]">
              Real-time module control
            </div>
          </div>

          <span className="text-[10px] text-[#D4BCD2] bg-[#D4BCD2]/10 px-2 py-[2px] rounded">
            LIVE
          </span>
        </div>

        {/* divider */}
        <div className="border-t border-white/5" />

        {/* MODULES */}
        <div className="space-y-3">

          {[
            {
              name: "AutoMod",
              desc: "Spam & link filtering",
              enabled: true,
            },
            {
              name: "Logging",
              desc: "Message & action logs",
              enabled: true,
            },
            {
              name: "Welcome",
              desc: "Join messages & roles",
              enabled: false,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between group p-2 rounded-lg hover:bg-white/[0.03] transition"
            >
              {/* left */}
              <div>
                <div className="text-gray-300 group-hover:text-white text-sm">
                  {s.name}
                </div>
                <div className="text-gray-500 text-[10px]">
                  {s.desc}
                </div>
              </div>

              {/* right */}
              <div className="flex items-center gap-2">

                {/* toggle style */}
                <div
                  className={`w-8 h-4 rounded-full relative transition ${
                    s.enabled
                      ? "bg-green-500/30"
                      : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-3 h-3 rounded-full transition ${
                      s.enabled
                        ? "right-[2px] bg-green-400"
                        : "left-[2px] bg-gray-400"
                    }`}
                  />
                </div>

                <span
                  className={`text-[10px] ${
                    s.enabled
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  {s.enabled ? "ON" : "OFF"}
                </span>

              </div>
            </div>
          ))}

        </div>

        {/* divider */}
        <div className="border-t border-white/5" />

        {/* stats row */}
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>3 modules active</span>
          <span>Last update: 2s ago</span>
        </div>

      </div>
    </div>
  </div>
)
    },

    {
      title: "LastFM Integration",
      description: "Track your music stats in Discord.",
      icon: <FaLastfm className="w-5 h-5" />,
      preview: (
  <div className="mt-5 text-xs space-y-3">

    {/* header */}
    <div className="flex items-center gap-2">
      <img src={BOT_AVATAR} className="w-6 h-6 rounded-full" />
      <span className="text-gray-300 font-medium">threat</span>
      <span className="text-[10px] text-gray-500">now playing</span>
    </div>

    {/* player card */}
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">

  {/* glow */}
  <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#D4BCD2]/20 blur-[120px] opacity-40 pointer-events-none" />

  {/* header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 font-semibold">
      as
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">LastFM Integration</h3>
      <p className="text-sm text-gray-400">Track your music stats in Discord.</p>
    </div>
  </div>

  <div className="border-t border-white/10 mb-6" />

  {/* user */}
  <div className="flex items-center gap-3 mb-5">
    <img src="/assets/site_logo.png" className="w-9 h-9 rounded-full" />
    <div className="flex items-center gap-2">
      <span className="text-sm text-white">threat</span>
      <span className="text-xs text-green-400">● listening</span>
      <span className="text-xs text-gray-500">via Spotify</span>
    </div>
  </div>

  {/* player */}
  <div className="group relative flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#1c1f26] to-[#15171c] p-4 border border-white/10 hover:border-[#D4BCD2]/40 transition-all duration-300">

    {/* top */}
    <div className="flex gap-4">
      <img
        src="/assets/kanye.jpg"
        className="w-16 h-16 rounded-xl shadow-lg"
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold truncate">
          Flashing Lights
        </h4>
        <p className="text-sm text-gray-400">Kanye West</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Graduation • 2007
        </p>

        {/* badges */}
        <div className="flex gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4BCD2]/20 text-[#D4BCD2]">
            Loved
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300">
            128 plays
          </span>
        </div>
      </div>
    </div>

    {/* progress */}
    <div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-[55%] bg-gradient-to-r from-[#D4BCD2] to-white rounded-full" />
      </div>

      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
        <span>1:42</span>
        <span>3:57</span>
      </div>
    </div>

    {/* bottom controls */}
    <div className="flex items-center justify-between mt-2">

      {/* fake controls */}
      <div className="flex items-center gap-3 text-gray-400">
        <button className="hover:text-white transition">⏮</button>
        <button className="text-white text-lg">⏸</button>
        <button className="hover:text-white transition">⏭</button>
      </div>

      {/* volume */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">🔊</span>
        <div className="w-16 h-1 bg-white/10 rounded-full">
          <div className="w-[70%] h-full bg-white/40 rounded-full" />
        </div>
      </div>
    </div>

    {/* footer meta */}
    <div className="flex justify-between text-[11px] text-gray-500 mt-1">
      <span>Started 2 min ago</span>
      <span>Scrobbling…</span>
    </div>

  </div>
</div>
        </div>

)
    },
  ];
};

export function FeaturesGrid() {
  const data = features();

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {data.map((feature) => (
        <li key={feature.title}>
          <div className="h-full rounded-2xl border border-white/10 p-6 bg-white/[0.03] backdrop-blur">

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg text-[#D4BCD2]">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              {feature.preview}
            </div>

          </div>
        </li>
      ))}
    </ul>
  );
}