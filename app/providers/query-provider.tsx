"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const fetchCommands = async () => {
  const response = await fetch("/c");
  if (!response.ok) throw new Error("couldn't fetch commands");
  return response.json();
};

const fetchStats = async () => {
  const response = await fetch("/s");
  if (!response.ok) throw new Error("couldn't fetch stats");
  return response.json();
};

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["commands"],
      queryFn: fetchCommands,
      staleTime: 5 * 60 * 1000,
    });

    queryClient.prefetchQuery({
      queryKey: ["status"],
      queryFn: fetchStats,
      staleTime: 15000,
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
