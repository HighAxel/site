// app/api/shards/route.ts
export async function GET() {
  const res = await fetch("http://194.36.88.214:8001/shards");
  return Response.json(await res.json());
}