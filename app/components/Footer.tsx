import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="flex flex-col sm:flex-row justify-between gap-10">
          
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/assets/site_logo.png"
                alt="Threat Logo"
                className="w-8 h-8 rounded-md"
              />
              <h2 className="text-xl font-semibold text-white">Threat</h2>
            </div>

            <p className="text-gray-400 mt-2 text-sm">
              Powerful Discord bot for automation & fun.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white mb-3">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/commands">Commands</Link></li>
                <li><Link href="/status">Status</Link></li>
                <li><Link href="/team">Team</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support">Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Threat</p>
          <div className="flex gap-4">
            <Link href="#">Discord</Link>
            <Link href="#">GitHub</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}