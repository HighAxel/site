"use client";

import BackToTop from "@/app/components/BackToTop";

export default function SupportPage() {
  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        {/* background effects */}
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        {/* HERO */}
        <section className="flex flex-col items-center text-center pt-32 pb-24">

          <h1 className="text-4xl sm:text-6xl font-bold">
            Need help?
          </h1>

          <p className="text-gray-400 mt-6 max-w-xl text-lg">
            Get support, ask questions, and resolve issues quickly. We're here to help you make the most out of your Discord experience.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap justify-center">

            <a
              href="#"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
            >
              Join Support Server
            </a>

            <a
              href="#"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
            >
              View Docs →
            </a>

          </div>
        </section>

        {/* SUPPORT OPTIONS */}
        <section className="max-w-6xl mx-auto py-16">

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Discord Support",
                desc: "Join our Discord server for live help from our team and community.",
                button: "Join Server",
              },
              {
                title: "Documentation",
                desc: "Browse guides and tutorials to learn how everything works.",
                button: "Read Docs",
              },
              {
                title: "Contact Us",
                desc: "Reach out directly for issues, feedback, or business inquiries.",
                button: "Email Us",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur hover:border-[#D4BCD2]/40 transition"
              >
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {item.desc}
                </p>

                <button className="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
                  {item.button}
                </button>
              </div>
            ))}

          </div>

        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto py-24">

          <h2 className="text-center text-3xl font-semibold mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-4">

            {[
              {
                q: "Why is the bot not responding?",
                a: "Make sure the bot has proper permissions and is online in your server.",
              },
              {
                q: "How do I configure features?",
                a: "Use the setup commands or dashboard to customize your server settings.",
              },
              {
                q: "Is there premium?",
                a: "Yes, premium unlocks advanced features and higher limits.",
              },
              {
                q: "Where can I report bugs?",
                a: "You can report bugs in our Discord server or contact us directly.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white/[0.03] border border-white/10 rounded-xl p-5 cursor-pointer transition hover:border-[#D4BCD2]/40"
              >
                <summary className="flex justify-between items-center text-sm font-medium">
                  {item.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}

          </div>

        </section>

        {/* CTA */}
        <section className="text-center py-20 border-t border-white/10">

          <h2 className="text-2xl sm:text-3xl font-semibold">
            Still need help?
          </h2>

          <p className="text-gray-400 mt-4">
            Our team is ready to assist you anytime.
          </p>

          <a
            href="#"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4BCD2] to-[#8A7288] text-black font-medium hover:opacity-90 transition"
          >
            Contact Support
          </a>

        </section>

      </main>

      <BackToTop />
    </>
  );
}