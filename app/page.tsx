import BackToTop from "@/app/components/BackToTop";
import { FeaturesGrid } from "@/app/components/FeaturesGrid";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center pt-32 pb-24">

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Discord’s most powerful{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
                all-in-one
              </span>
              <svg
                viewBox="0 0 200 20"
                className="absolute left-0 right-0 -bottom-3 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15 Q100 5 195 15"
                  stroke="#D4BCD2"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            app
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl text-lg">
            Discover a next-level Discord bot built to streamline management and boost community interaction.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap justify-center">
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
            >
              Invite to Discord
            </a>

            <a
              href="#"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
            >
              Explore →
            </a>
          </div>
        </section>

        {/* 🔥 NEW FEATURES GRID */}
        <section className="max-w-6xl mx-auto py-24">
          <h2 className="text-center text-3xl font-semibold mb-16">
            Powerful features
          </h2>

          <FeaturesGrid />
        </section>

        {/* STATS CARDS */}
        <section className="max-w-6xl mx-auto py-24">
          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Blazing Fast",
                desc: "Commands execute instantly with optimized performance.",
                stat: "0.1s"
              },
              {
                title: "Highly Reliable",
                desc: "99.99% uptime ensures your server is always protected.",
                stat: "99.99%"
              },
              {
                title: "Fully Customizable",
                desc: "Tailor every feature to your needs.",
                stat: "∞"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur hover:border-[#D4BCD2]/40 transition"
              >
                <div className="text-3xl font-bold text-[#D4BCD2] mb-4">
                  {item.stat}
                </div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-16 border-t border-white/10" />
        </section>

        {/* TRUST */}
        <section className="text-center py-20 border-t border-white/10">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Trusted by thousands of guilds
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Become part of the growing number of Discord communities using Threat.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto py-24">
          <h2 className="text-center text-3xl font-semibold mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-4">

            {[
              {
                q: "Is the bot free?",
                a: "Yes, with optional premium features."
              },
              {
                q: "How do I set it up?",
                a: "Invite the bot and run setup."
              },
              {
                q: "Is it safe?",
                a: "Yes, secure permission systems."
              },
              {
                q: "Can I customize?",
                a: "Almost everything is configurable."
              }
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white/[0.03] border border-white/10 rounded-xl p-5 cursor-pointer hover:border-[#D4BCD2]/40 transition"
              >
                <summary className="flex justify-between items-center text-sm font-medium">
                  {item.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm text-gray-400">
                  {item.a}
                </p>
              </details>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20">
          <h2 className="text-3xl font-bold">
            Ready to elevate your server?
          </h2>

          <p className="text-gray-400 mt-4">
            Get started in seconds.
          </p>

          <a
            href="https://discord.com/oauth2/authorize?client_id=1496901318592303276&permissions=8&scope=bot"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
          >
            Invite Bot
          </a>
        </section>

      </main>

      <BackToTop />
    </>
  );
}