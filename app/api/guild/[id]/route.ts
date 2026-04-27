export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `http://194.36.88.214:8001/guild/${params.id}`
  );

  return Response.json(await res.json());
}