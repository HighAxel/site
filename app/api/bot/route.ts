// app/api/bot/route.ts
export async function GET() {
  const res = await fetch("http://194.36.88.214:8001/bot");
  return Response.json(await res.json());
}