export async function GET() {
  try {
    const res = await fetch("http://194.36.88.214:8001/guilds", {
      cache: "no-store",
    });

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "API failed" }, { status: 500 });
  }
}