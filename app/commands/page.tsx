"use client";

import { useEffect, useState } from "react";
import BackToTop from "@/app/components/BackToTop";

type Command = {
  name: string;
  category: string;
  description: string;
  usage: string;
  aliases: string[];
};

export default function Page() {
  const [categories, setCategories] = useState<Record<string, Command[]>>({});
  const [active, setActive] = useState<string>("All");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/commands.json")
      .then((res) => res.json())
      .then((data: Command[]) => {
        const filtered = data.filter((cmd) => {
          const cat = cmd.category?.toLowerCase();

          return (
            cat &&
            cat !== "no category" &&
            cat !== "owner" &&
            cat !== "jishaku"
          );
        });

        const grouped: Record<string, Command[]> = {
          All: filtered,
        };

        filtered.forEach((cmd) => {
          const catName = cmd.category
            ? cmd.category.charAt(0).toUpperCase() +
              cmd.category.slice(1).toLowerCase()
            : "Other";

          if (!grouped[catName]) grouped[catName] = [];
          grouped[catName].push(cmd);
        });

        setCategories(grouped);
        setActive("All");
      });
  }, []);

  const handleCopy = (usage: string, name: string) => {
    navigator.clipboard.writeText(usage);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  };


  return (
    <>


      <main className="min-h-screen text-white px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-center mb-12">Commands</h1>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                active === cat
                  ? "bg-[#D4BCD2] text-black border-transparent"
                  : "bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat} ({categories[cat].length})
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories[active]?.map((cmd, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5 backdrop-blur hover:border-[#D4BCD2]/40 transition"
            >
              <h3 className="text-lg font-semibold text-[#D4BCD2]">
                {cmd.name}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {cmd.description || "No description"}
              </p>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-500 bg-black/40 px-3 py-1 rounded">
                  {cmd.usage}
                </span>

                <button
                  onClick={() => handleCopy(cmd.usage, cmd.name)}
                  className="p-2 rounded-md bg-white/[0.05] hover:bg-white/10 transition group"
                >
                  {copied === cmd.name ? (
                    <svg
                      className="w-4 h-4 text-[#D4BCD2]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-white transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15V5a2 2 0 012-2h10" />
                    </svg>
                  )}
                </button>
              </div>

              {cmd.aliases?.length > 0 && (
                <div className="mt-3 text-xs text-gray-500">
                  Aliases: {cmd.aliases.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>



      <BackToTop />
    </>
  );
}