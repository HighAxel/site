"use client";

import {
  HiClock,
  HiSignal,
  HiWifi,
  HiCube,
  HiServerStack,
  HiUsers,
  HiMagnifyingGlass,
} from "react-icons/hi2";

import { formatDistanceToNow } from "date-fns";

import { useQuery } from "@tanstack/react-query";

import {
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

const API = "https://api.threat.best";

const calculateShard = (
  guildId: string,
  totalShards: number
): number => {
  const id = BigInt(guildId);

  const shardId = id >> BigInt(22);

  return Number(
    shardId % BigInt(totalShards)
  );
};

const formatUptime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

const fetchStats = async () => {
  const [
    botRes,
    shardsRes,
    guildsRes,
  ] = await Promise.all([
    fetch(`${API}/bot`, {
      cache: "no-store",
    }),

    fetch(`${API}/shards`, {
      cache: "no-store",
    }),

    fetch(`${API}/guilds`, {
      cache: "no-store",
    }),
  ]);

  if (
    !botRes.ok ||
    !shardsRes.ok ||
    !guildsRes.ok
  ) {
    throw new Error(
      "couldn't fetch stats"
    );
  }

  const bot = await botRes.json();

  const shardsData =
    await shardsRes.json();

  const guildsData =
    await guildsRes.json();

  const shards =
    shardsData.shards || [];

  const guilds =
    guildsData.guilds || [];

  const shardStats: any = {};

  for (const shard of shards) {
    const shardGuilds = guilds.filter(
      (g: any) =>
        g.shard_id === shard.id
    );

    shardStats[shard.id] = {
      id: shard.id,

      latency: shard.latency_ms,

      guilds: shardGuilds.length,

      users: shardGuilds.reduce(
        (acc: number, g: any) =>
          acc + (g.members || 0),
        0
      ),
    };
  }

  return {
    latency: bot.latency_ms,

    uptime: performance.now(),

    guilds: bot.guilds,

    users: bot.users,

    shards: bot.shards,

    shard_stats: shardStats,

    timestamp:
      new Date().toISOString(),
  };
};

function StatCard({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel backdrop-blur-sm bg-background/50 p-4 ${className}`}
    >
      <div className="text-sm text-white/60 mb-1 font-medium">
        {label}
      </div>

      <div className="text-lg font-medium">
        {value}
      </div>
    </div>
  );
}

export default function StatusPage() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    highlightedShard,
    setHighlightedShard,
  ] = useState<number | null>(null);

  const shardRefs = useRef<{
    [key: number]:
      | HTMLDivElement
      | null;
  }>({});

  const {
    data: stats,
    isLoading,
  } = useQuery({
    queryKey: ["status"],

    queryFn: fetchStats,

    refetchInterval: 30000,

    staleTime: 15000,
  });

  const searchResult = useMemo(() => {
    if (
      !searchQuery.trim() ||
      !stats?.shards
    ) {
      return null;
    }

    const guildId =
      searchQuery.trim();

    if (!/^\d+$/.test(guildId)) {
      return null;
    }

    const targetShard =
      calculateShard(
        guildId,
        stats.shards
      );

    return {
      guildId,
      targetShard,
    };
  }, [searchQuery, stats?.shards]);

  const scrollToShard = () => {
    if (searchResult) {
      const shardElement =
        shardRefs.current[
          searchResult.targetShard
        ];

      if (shardElement) {
        shardElement.scrollIntoView({
          behavior: "smooth",

          block: "center",

          inline: "center",
        });
      }
    }
  };

  useEffect(() => {
    if (searchResult) {
      setHighlightedShard(
        searchResult.targetShard
      );
    } else {
      setHighlightedShard(null);
    }
  }, [searchResult]);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-medium text-gradient mb-2">
              System Status
            </h1>

            <p className="text-muted-foreground">
              Real-time monitoring and
              performance metrics
            </p>
          </div>

          <div className="relative mt-4 sm:mt-0 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Guild ID"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full sm:w-40 pl-3 pr-10 py-2 bg-background/30 border border-[#D4BCD2]/20 rounded-lg text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#D4BCD2]/30 focus:border-[#D4BCD2]/40 sm:truncate"
            />

            <button
              onClick={scrollToShard}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-[#D4BCD2]/10 rounded transition-colors"
            >
              <HiMagnifyingGlass className="h-3 w-3 text-[#D4BCD2]/60" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
              {Array.from({
                length: 4,
              }).map((_, i) => (
                <div
                  key={i}
                  className="glass-panel backdrop-blur-sm bg-background/50 p-4 border-2 border-[#D4BCD2]/20 animate-pulse"
                >
                  <div className="h-4 w-20 bg-white/10 rounded mb-2" />

                  <div className="h-8 w-32 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : stats &&
          stats.latency !==
            undefined ? (
          <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
              <StatCard
                label="Latency"
                value={`${Math.round(
                  stats.latency
                )}ms`}
                className="bg-background/50 border-2 border-[#D4BCD2]/20"
              />

              <StatCard
                label="Uptime"
                value={formatUptime(
                  stats.uptime
                )}
                className="bg-background/50 border-2 border-[#D4BCD2]/20"
              />

              <StatCard
                label="Servers"
                value={stats.guilds.toLocaleString()}
                className="bg-background/50 border-2 border-[#D4BCD2]/20"
              />

              <StatCard
                label="Users"
                value={stats.users.toLocaleString()}
                className="bg-background/50 border-2 border-[#D4BCD2]/20"
              />
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(
                stats.shard_stats || {}
              ).map(
                ([id, shard]: [
                  string,
                  any
                ]) => {
                  const isHighlighted =
                    highlightedShard ===
                    shard.id;

                  return (
                    <div
                      key={id}
                      ref={(el) => {
                        shardRefs.current[
                          shard.id
                        ] = el;
                      }}
                      className={`glass-panel backdrop-blur-sm bg-background/50 p-4 border-2 rounded-2xl transition-all duration-300 ${
                        isHighlighted
                          ? "border-[#D4BCD2] shadow-[0_0_15px_rgba(212,188,210,0.4)] bg-[#D4BCD2]/5"
                          : "border-[#D4BCD2]/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-lg font-semibold">
                            Shard{" "}
                            {shard.id}
                          </p>

                          <p className="text-xs text-neutral-400 inline-flex items-center">
                            <HiClock className="h-3 w-3 mr-1" />

                            {formatDistanceToNow(
                              new Date(
                                stats.timestamp
                              ),
                              {
                                addSuffix: true,
                              }
                            ).replace(
                              "about ",
                              ""
                            )}
                          </p>
                        </div>

                        <span
                          className={`text-xs inline-flex items-center font-medium py-1 px-2 rounded-full border border-white/10 bg-background/50 ${
                            shard.latency <
                            100
                              ? "text-[#D4BCD2]"
                              : shard.latency <
                                200
                              ? "text-[#8A7288]"
                              : "text-[#2D2424]"
                          }`}
                        >
                          <HiSignal className="mr-1 h-3 w-3" />

                          <span>
                            Operational
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-neutral-400 text-xs">
                            Latency
                          </p>

                          <p className="text-white font-medium inline-flex items-center">
                            <HiWifi className="mr-1 h-3 w-3 text-neutral-400" />

                            {Math.round(
                              shard.latency
                            )}
                            ms
                          </p>
                        </div>

                        <div>
                          <p className="text-neutral-400 text-xs">
                            Uptime
                          </p>

                          <p className="text-white font-medium inline-flex items-center">
                            <HiCube className="mr-1 h-3 w-3 text-neutral-400" />

                            {formatUptime(
                              stats.uptime
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-neutral-400 text-xs">
                            Servers
                          </p>

                          <p className="text-white font-medium inline-flex items-center">
                            <HiServerStack className="mr-1 h-3 w-3 text-neutral-400" />

                            {shard.guilds.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-neutral-400 text-xs">
                            Users
                          </p>

                          <p className="text-white font-medium inline-flex items-center">
                            <HiUsers className="mr-1 h-3 w-3 text-neutral-400" />

                            {shard.users.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <div className="bg-background/50 border-2 rounded-3xl border-destructive/20 p-8 text-center">
            <div className="mb-2 text-xl">
              Unable to fetch status
            </div>

            <p className="text-muted-foreground text-sm">
              Please try again later
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
