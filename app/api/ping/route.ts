// app/api/ping/route.ts
export async function GET() {
  const res = await fetch("http://194.36.88.214:8001/ping");
  return Response.json(await res.json());
}