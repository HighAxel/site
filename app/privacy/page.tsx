

export default function Privacy() {
  return (
    <>

      <main className="relative min-h-screen text-white px-6 overflow-hidden">
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="max-w-4xl mx-auto pt-32 pb-24">

          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            Privacy <span className="text-[#D4BCD2]">Policy</span>
          </h1>

          <p className="text-gray-400 text-center mt-4 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-12 space-y-8 text-sm text-gray-300 leading-relaxed">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Information We Collect</h2>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Discord user IDs and server IDs</li>
                <li>• Message content (only for moderation features)</li>
                <li>• Command usage data</li>
                <li>• Server configuration settings</li>
              </ul>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">How We Use Data</h2>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>• Provide bot functionality</li>
                <li>• Improve performance and features</li>
                <li>• Prevent abuse and enforce moderation</li>
              </ul>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Data Storage</h2>
              <p className="mt-2 text-gray-400">
                Data is securely stored and only retained as long as necessary
                to provide the service.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Third Parties</h2>
              <p className="mt-2 text-gray-400">
                We do not sell or share your data with third parties. Data is only
                used within the bot's systems.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-lg font-semibold">Your Rights</h2>
              <p className="mt-2 text-gray-400">
                You may request data removal or inquire about stored data at any time.
              </p>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}