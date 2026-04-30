"use client";

import Link from "next/link";
import { Shield, ArrowRight, Bot, Sparkles } from "lucide-react";

export default function InvitePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,188,210,0.18),transparent_40%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.06] bg-[url('/noise.png')]" />

      {/* Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#D4BCD2]/10 blur-3xl -z-10" />

      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
          <Sparkles size={16} className="text-[#D4BCD2]" />
          <span className="text-sm text-gray-300">
            Powerful moderation • Utility • Protection
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-5xl text-5xl sm:text-7xl font-bold leading-tight tracking-tight">
          Add{" "}
          <span className="bg-gradient-to-r from-[#D4BCD2] to-white bg-clip-text text-transparent">
            Threat
          </span>{" "}
          to your Discord server
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg text-gray-400 leading-relaxed">
          Advanced moderation, security, automation, logging, utilities,
          and next-generation server management — all in one Discord bot.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <a
            href="https://discord.com/oauth2/authorize?client_id=1496901318592303276&permissions=8&scope=bot"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] px-8 py-4 font-semibold text-black transition hover:scale-[1.02]"
          >
            Invite Threat
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </a>

          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 font-medium text-white backdrop-blur transition hover:bg-white/[0.08]"
          >
            Back to Homepage
          </Link>

        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">

          {[
            {
              title: "Server Protection",
              desc: "Powerful anti-abuse and moderation systems.",
              icon: Shield,
            },
            {
              title: "Advanced Features",
              desc: "Logging, automod, utilities, AI tools, and more.",
              icon: Bot,
            },
            {
              title: "Fast & Reliable",
              desc: "Optimized infrastructure with blazing fast response times.",
              icon: Sparkles,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:border-[#D4BCD2]/40 hover:bg-white/[0.05]"
              >

                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(212,188,210,0.12),transparent_60%)]" />

                <div className="relative z-10">

                  <div className="mb-5 inline-flex rounded-2xl bg-[#D4BCD2]/10 p-3 text-[#D4BCD2]">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {item.desc}
                  </p>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 py-20 text-center">

        <h2 className="text-3xl font-bold">
          Ready to secure your community?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Invite Threat now and unlock powerful moderation and management tools
          for your Discord server.
        </p>

        <a
          href="https://discord.com/oauth2/authorize?client_id=1496901318592303276&permissions=8&scope=bot"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] px-8 py-4 font-semibold text-black transition hover:opacity-90"
        >
          Invite to Discord
          <ArrowRight size={18} />
        </a>

      </section>
    </main>
  );
}
