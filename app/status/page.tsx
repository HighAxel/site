"use client";

import React from "react";
import BackToTop from "@/app/components/BackToTop";

type Shard = {
  id: number;
  latency: number;
};

type Guild = {
  id: number;
  name: string;
  members: number;
  shard_id: number;
};

type ShardStats = Shard & {
  servers: number;
  users: number;
  status: "operational" | "degraded" | "outage";
  history: number[];
};

const API = "http://194.36.88.214:8001";
const REFRESH_MS = 5000;
const MAX_HISTORY = 24;

export default function StatusPage() {
  const [shards, setShards] = React.useState<ShardStats[]>([]);
  const [guilds, setGuilds] = React.useState<Guild[]>([]);
  const [guildId, setGuildId] = React.useState("");
  const [guildResult, setGuildResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [apiOnline, setApiOnline] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const [shardsRes, guildsRes] = await Promise.all([
        fetch(`${API}/shards`, { cache: "no-store" }),
        fetch(`${API}/guilds`, { cache: "no-store" }),
      ]);

      if (!shardsRes.ok || !guildsRes.ok) throw new Error("API failed");

      const shardsData: Shard[] = await shardsRes.json();
      const guildsData: Guild[] = await guildsRes.json();

      setGuilds(guildsData);

      setShards((prev) =>
        shardsData.map((shard) => {
          const shardGuilds = guildsData.filter((g) => g.shard_id === shard.id);
          const old = prev.find((s) => s.id === shard.id);

          const history = [...(old?.history ?? []), shard.latency].slice(
            -MAX_HISTORY
          );

          const status =
            shard.latency >= 1000
              ? "outage"
              : shard.latency >= 350
              ? "degraded"
              : "operational";

          return {
            ...shard,
            servers: shardGuilds.length,
            users: shardGuilds.reduce((acc, g) => acc + (g.members || 0), 0),
            status,
            history,
          };
        })
      );

      setApiOnline(true);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("API ERROR:", err);
      setApiOnline(false);

      setShards((prev) =>
        prev.map((shard) => ({
          ...shard,
          status: "outage",
        }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, REFRESH_MS);

    return () => clearInterval(interval);
  }, [fetchData]);

  const searchGuild = async () => {
    if (!guildId.trim()) return;

    try {
      const res = await fetch(`${API}/guild/${guildId.trim()}`);
      const data = await res.json();

      if (data.error) {
        setGuildResult({ error: true });
        return;
      }

      const shard = shards.find((s) => s.id === data.shard_id);

      setGuildResult({
        name: data.name,
        members: data.members,
        shard: data.shard_id,
        latency: shard?.latency ?? "Unknown",
        status: shard?.status ?? "unknown",
      });
    } catch {
      setGuildResult({ error: true });
    }
  };

  const totalServers = shards.reduce((acc, shard) => acc + shard.servers, 0);
  const totalUsers = shards.reduce((acc, shard) => acc + shard.users, 0);
  const avgLatency =
    shards.length > 0
      ? Math.round(
          shards.reduce((acc, shard) => acc + shard.latency, 0) / shards.length
        )
      : 0;

  const outageCount = shards.filter((s) => s.status === "outage").length;
  const degradedCount = shards.filter((s) => s.status === "degraded").length;

  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden pt-32">
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="max-w-6xl mx-auto pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur text-sm text-gray-400">
                <ActivityIcon />
                Live status updates every 5s
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                System{" "}
                <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
                  Status
                </span>
              </h1>

              <p className="text-gray-400 mt-5 max-w-2xl text-lg">
                Monitor shard latency, guild distribution, outages, and live
                performance across Threat.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Enter Server ID"
                value={guildId}
                onChange={(e) => setGuildId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchGuild()}
                className="w-full sm:w-72 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 outline-none backdrop-blur text-sm placeholder:text-gray-500 focus:border-[#D4BCD2]/40 transition"
              />

              <button
                onClick={searchGuild}
                className="px-4 rounded-xl bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black hover:opacity-90 transition"
                aria-label="Search guild"
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto pb-10">
          <div
            className={`rounded-2xl border p-5 backdrop-blur ${
              apiOnline
                ? "bg-green-400/[0.04] border-green-400/20"
                : "bg-red-400/[0.04] border-red-400/20"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <GlowDot status={apiOnline ? "operational" : "outage"} />
                <div>
                  <p className="font-semibold">
                    {apiOnline
                      ? outageCount > 0
                        ? "Partial outage detected"
                        : degradedCount > 0
                        ? "Some shards are degraded"
                        : "All systems operational"
                      : "API is currently unreachable"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {lastUpdated
                      ? `Last updated ${lastUpdated.toLocaleTimeString()}`
                      : "Waiting for first update"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshIcon />
                Auto-refresh enabled
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto pb-14">
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              icon={<ServerIcon />}
              label="Total Servers"
              value={totalServers.toLocaleString()}
            />
            <StatCard
              icon={<UsersIcon />}
              label="Total Users"
              value={totalUsers.toLocaleString()}
            />
            <StatCard
              icon={<LatencyIcon />}
              label="Average Latency"
              value={`${avgLatency}ms`}
            />
          </div>
        </section>

        {guildResult && (
          <section className="max-w-6xl mx-auto pb-12">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              {guildResult.error ? (
                <div className="flex items-center gap-3 text-red-400">
                  <WarningIcon />
                  <p>Guild not found or unavailable.</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-lg font-semibold">
                      {guildResult.name}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {guildResult.members?.toLocaleString()} members
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Shard</p>
                      <p>{guildResult.shard}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Latency</p>
                      <p>{guildResult.latency}ms</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto pb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold">Shards</h2>

            <div className="text-sm text-gray-400">
              {shards.length} shard{shards.length === 1 ? "" : "s"}
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shards.map((shard) => (
                <ShardCard key={shard.id} shard={shard} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BackToTop />
    </>
  );
}

function ShardCard({ shard }: { shard: ShardStats }) {
  const statusText =
    shard.status === "operational"
      ? "Operational"
      : shard.status === "degraded"
      ? "Degraded"
      : "Outage";

  const statusClass =
    shard.status === "operational"
      ? "text-green-400"
      : shard.status === "degraded"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur hover:border-[#D4BCD2]/40 transition overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Shard {shard.id}</h3>
          <p className="text-gray-400 text-sm mt-1">Discord gateway shard</p>
        </div>

        <div className={`flex items-center gap-2 text-sm ${statusClass}`}>
          <GlowDot status={shard.status} />
          {statusText}
        </div>
      </div>

      <LatencyGraph values={shard.history} status={shard.status} />

      <div className="grid grid-cols-3 gap-4 text-sm mt-6">
        <div>
          <p className="text-gray-400">Latency</p>
          <p>{shard.latency}ms</p>
        </div>

        <div>
          <p className="text-gray-400">Servers</p>
          <p>{shard.servers.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Users</p>
          <p>{shard.users.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function LatencyGraph({
  values,
  status,
}: {
  values: number[];
  status: "operational" | "degraded" | "outage";
}) {
  const safeValues = values.length ? values : [0];
  const max = Math.max(...safeValues, 100);

  const points = safeValues
    .map((value, index) => {
      const x =
        safeValues.length === 1 ? 0 : (index / (safeValues.length - 1)) * 100;
      const y = 44 - (Math.min(value, max) / max) * 36;
      return `${x},${y}`;
    })
    .join(" ");

  const stroke =
    status === "operational"
      ? "#4ade80"
      : status === "degraded"
      ? "#facc15"
      : "#f87171";

  return (
    <div className="h-24 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <svg viewBox="0 0 100 48" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`line-${status}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor={stroke} stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M0 44 H100"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        <polyline
          points={points}
          fill="none"
          stroke={`url(#line-${status})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {safeValues.map((value, index) => {
          const x =
            safeValues.length === 1
              ? 0
              : (index / (safeValues.length - 1)) * 100;
          const y = 44 - (Math.min(value, max) / max) * 36;

          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={stroke}
              opacity={index === safeValues.length - 1 ? 1 : 0.35}
            />
          );
        })}
      </svg>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur hover:border-[#D4BCD2]/40 transition">
      <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D4BCD2] mb-5">
        {icon}
      </div>

      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function GlowDot({
  status,
}: {
  status: "operational" | "degraded" | "outage";
}) {
  const color =
    status === "operational"
      ? "bg-green-400"
      : status === "degraded"
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-60 animate-ping`}
      />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 21l-4.35-4.35" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#D4BCD2]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#D4BCD2]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LatencyIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}