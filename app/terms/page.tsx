export default function Terms() {
  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="max-w-4xl mx-auto pt-32 pb-24">

          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            Terms of <span className="text-[#D4BCD2]">Service</span>
          </h1>

          <p className="text-gray-400 text-center mt-4 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-12 space-y-8 text-sm text-gray-300 leading-relaxed">

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Acceptance of Terms</h2>
              <p className="mt-2 text-gray-400">
                By using Threat, you agree to these Terms of Service. If you do not agree,
                you must stop using the bot immediately.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Usage Rules</h2>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Do not misuse, exploit, or abuse the bot</li>
                <li>• Do not use the bot for illegal or harmful activities</li>
                <li>• Follow Discord’s Terms of Service and Guidelines</li>
              </ul>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Service Availability</h2>
              <p className="mt-2 text-gray-400">
                We aim to provide a stable and reliable service, but uptime is not guaranteed.
                Features may change, be updated, or removed at any time.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Data Usage</h2>
              <p className="mt-2 text-gray-400">
                By using the bot, you agree to the collection and use of data as described
                in our Privacy Policy.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Termination</h2>
              <p className="mt-2 text-gray-400">
                We reserve the right to restrict or terminate access to the bot at any time,
                without notice, if these terms are violated.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Limitation of Liability</h2>
              <p className="mt-2 text-gray-400">
                Threat is provided "as is" without warranties. We are not responsible
                for any damages, data loss, or issues caused by using the bot.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Changes to Terms</h2>
              <p className="mt-2 text-gray-400">
                These terms may be updated at any time. Continued use of the bot
                means you accept any changes.
              </p>
            </div>

          </div>
        </section>

      </main>

    </>
  );
}