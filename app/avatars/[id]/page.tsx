import Image from "next/image"
import BackToTop from "@/app/components/BackToTop"

async function getData(id: string) {
  const res = await fetch(`http://YOUR_API_IP:8001/avatars?user_id=${id}`, {
    cache: "no-store"
  })

  return res.json()
}

export default async function AvatarHistoryPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await getData(id)

  if (!data.success) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">User not found</h1>
          <p className="text-gray-400 mt-3">
            Could not fetch avatar history.
          </p>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="relative min-h-screen text-white px-6 overflow-hidden">

        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 opacity-[0.12] bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 -top-32 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,188,210,0.15),transparent_60%)]" />

        <section className="max-w-6xl mx-auto pt-28 pb-24">

          <div className="flex flex-col items-center text-center">

            <Image
              src={data.user.avatar}
              alt="avatar"
              width={120}
              height={120}
              className="rounded-full border border-white/10"
            />

            <h1 className="text-4xl font-bold mt-6">
              {data.user.display_name}
            </h1>

            <p className="text-gray-400 mt-2">
              @{data.user.username}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {data.count} avatars found
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">

            {data.avatars.map((avatar: any, index: number) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur hover:border-[#D4BCD2]/40 transition"
              >

                <div className="relative aspect-square">
                  <Image
                    src={avatar.avatar}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">

                  <p className="text-sm text-gray-400">
                    {new Date(avatar.changed_at).toLocaleString()}
                  </p>

                  <a
                    href={avatar.avatar}
                    target="_blank"
                    className="inline-block mt-3 text-sm text-[#D4BCD2] hover:underline"
                  >
                    Open Avatar
                  </a>

                </div>

              </div>
            ))}

          </div>

        </section>

      </main>

      <BackToTop />
    </>
  )
}
