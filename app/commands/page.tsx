"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BackToTop from "@/app/components/BackToTop";

import {
  Search,
  Info,
  Wrench,
  Shield,
  Smile,
  Sparkles,
  Palette,
  Users,
  MessageCircle,
  Crown,
  Settings,
  Zap,
  X,
} from "lucide-react";

type Command = {
  name: string;
  category: string;
  description: string;
  usage: string;
  aliases: string[];
};

export default function Page() {
  const [categories, setCategories] = useState<
    Record<string, Command[]>
  >({});

  const [allCommands, setAllCommands] = useState<
    Command[]
  >([]);

  const [active, setActive] = useState<string>("All");

  const [copied, setCopied] = useState<string | null>(
    null
  );

  const [searchOpen, setSearchOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [highlighted, setHighlighted] = useState<
    string | null
  >(null);

  const commandRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  useEffect(() => {
    fetch("https://api.threat.best/commands")
      .then((res) => res.json())
      .then((data) => {
        const commands: Command[] = data.commands || [];

        const filtered = commands.filter((cmd) => {
          const cat = cmd.category?.toLowerCase();

          return (
            cat &&
            cat !== "no category" &&
            cat !== "owner" &&
            cat !== "jishaku"
          );
        });

        setAllCommands(filtered);

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

  const filteredSearch = useMemo(() => {
    if (!search) return [];

    return allCommands.filter((cmd) =>
      cmd.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, allCommands]);

const handleCopy = (
  usage: string,
  name: string
) => {
  const fullCommand = usage
    ? `,${name} ${usage}`
    : `,${name}`;

  navigator.clipboard.writeText(fullCommand);

  setCopied(name);

  setTimeout(() => {
    setCopied(null);
  }, 1200);
};
  const jumpToCommand = (cmd: Command) => {
    const category =
      cmd.category.charAt(0).toUpperCase() +
      cmd.category.slice(1).toLowerCase();

    setActive(category);

    setSearchOpen(false);

    setSearch("");

    setTimeout(() => {
      const element =
        commandRefs.current[cmd.name];

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setHighlighted(cmd.name);

      setTimeout(() => {
        setHighlighted(null);
      }, 1800);
    }, 150);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "All":
        return <Search className="w-5 h-5" />;

      case "Info":
        return <Info className="w-5 h-5" />;

      case "Utility":
        return <Wrench className="w-5 h-5" />;

      case "Moderation":
        return <Shield className="w-5 h-5" />;

      case "Fun":
        return <Smile className="w-5 h-5" />;

      case "Emoji":
        return <Sparkles className="w-5 h-5" />;

      case "Reskin":
        return <Palette className="w-5 h-5" />;

      case "Boosters":
        return <Zap className="w-5 h-5" />;

      case "Social":
        return <Users className="w-5 h-5" />;

      case "Config":
        return <Settings className="w-5 h-5" />;

      case "Owner":
        return <Crown className="w-5 h-5" />;

      default:
        return (
          <MessageCircle className="w-5 h-5" />
        );
    }
  };

  return (
    <>
      <main className="min-h-screen text-white px-6 pt-20 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Commands
            </h1>

            <p className="text-[#7c7c85] mt-3 text-[15px]">
              Explore every available command and category
            </p>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="
              flex items-center justify-center
              h-12 w-12
              rounded-2xl
              border border-white/[0.05]
              bg-[#0c0c0f]
              text-[#9b9ba5]
              transition-all duration-200
              hover:bg-[#111113]
              hover:text-white
            "
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-10 max-w-7xl mx-auto">
          <div
            className="
              overflow-x-auto scrollbar-hide
              rounded-[28px]
              border border-white/[0.04]
              bg-[#0a0a0c]
              shadow-[0_0_40px_rgba(0,0,0,0.45)]
            "
          >
            <div className="flex w-max min-w-full items-stretch">
              {Object.keys(categories).map(
                (cat, index) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setActive(cat)
                    }
                    className={`
                    relative
                    flex items-center gap-4
                    px-7 py-5
                    text-[15px]
                    font-semibold
                    whitespace-nowrap
                    transition-all duration-200

                    ${
                      active === cat
                        ? "bg-[#111113] text-white"
                        : "text-[#8e8e98] hover:text-white hover:bg-[#0f0f12]"
                    }

                    ${
                      index !==
                      Object.keys(categories)
                        .length -
                        1
                        ? "border-r border-white/[0.04]"
                        : ""
                    }
                  `}
                  >
                    <div className="text-[#9fb2bf]">
                      {getCategoryIcon(cat)}
                    </div>

                    <span className="capitalize tracking-tight">
                      {cat.toLowerCase()}
                    </span>

                    <div
                      className="
                      rounded-full
                      bg-[#1a1a1f]
                      px-3 py-1
                      text-[13px]
                      font-bold
                      text-[#b7b7c2]
                    "
                    >
                      {categories[cat].length}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories[active]?.map((cmd, i) => (
            <div
              key={i}
              ref={(el) => {
                commandRefs.current[cmd.name] =
                  el;
              }}
              className={`
                group
                overflow-hidden
                rounded-[22px]
                border
                bg-[#09090b]
                transition-all duration-500
                hover:-translate-y-1

                ${
                  highlighted === cmd.name
                    ? "border-[#c7b3d9] shadow-[0_0_40px_rgba(199,179,217,0.35)] scale-[1.02]"
                    : "border-white/[0.05] hover:border-white/[0.08]"
                }
              `}
            >
              {/* Top */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[24px] leading-none font-bold tracking-tight text-white">
                      {cmd.name}
                    </h3>

                    <p className="mt-4 text-[14px] font-medium text-[#7c7c85] max-w-[220px] leading-relaxed">
                      {cmd.description ||
                        "No description"}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        cmd.usage || cmd.name,
                        cmd.name
                      )
                    }
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-lg
                      text-[#a1a1aa]
                      transition-all duration-200
                      hover:bg-white/[0.03]
                      hover:text-white
                    "
                  >
                    {copied === cmd.name ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                        />
                        <path d="M5 15V5a2 2 0 012-2h10" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="h-px bg-white/[0.04]" />

              {/* Bottom */}
              <div className="p-5 space-y-6">
                <div>
                  <h4 className="text-[14px] font-semibold text-[#c7b3d9] mb-3">
                    arguments
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className="
                        rounded-xl
                        bg-white/[0.03]
                        px-3 py-2
                        text-[14px]
                        text-[#8b8b94]
                      "
                    >
                      {cmd.usage || "None"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[14px] font-semibold text-[#c7b3d9] mb-3">
                    permissions
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className="
                        rounded-xl
                        bg-white/[0.03]
                        px-3 py-2
                        text-[14px]
                        text-[#8b8b94]
                      "
                    >
                      None
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/70
            backdrop-blur-sm
            flex items-start justify-center
            pt-40
          "
        >
          <div
            className="
              w-full max-w-[650px]
              overflow-hidden
              rounded-[28px]
              border border-white/[0.05]
              bg-[#111214]
              shadow-[0_0_50px_rgba(0,0,0,0.6)]
            "
          >
            {/* Input */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-white/[0.05]">
              <Search className="w-5 h-5 text-[#8f8f98]" />

              <input
                autoFocus
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search for commands..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-[18px]
                  font-medium
                  text-white
                  placeholder:text-[#7b7b84]
                "
              />

              <button
                onClick={() =>
                  setSearchOpen(false)
                }
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  text-[#8f8f98]
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[500px] overflow-y-auto p-3 space-y-3">
              {filteredSearch.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() =>
                    jumpToCommand(cmd)
                  }
                  className="
                    w-full text-left
                    rounded-2xl
                    bg-[#0d0e10]
                    border border-white/[0.03]
                    p-4
                    transition-all duration-200
                    hover:bg-[#131417]
                    hover:border-white/[0.06]
                  "
                >
                  <div className="flex items-center gap-2 text-[#9a9aa4] text-[14px]">
                    <Search className="w-4 h-4" />

                    <span>{cmd.category}</span>
                  </div>

                  <h3 className="mt-2 text-[24px] font-bold text-white">
                    {cmd.name}
                  </h3>

                  <p className="mt-1 text-[15px] text-[#7d7d86]">
                    {cmd.description ||
                      "No description"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </>
  );
}