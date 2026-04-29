export async function GET(request: Request) {
  const referer = request.headers.get("referer");

  if (!referer) {
    return Response.redirect("https://threat.best");
  }

  const res = await fetch("https://api.threat.best/commands", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return Response.json(data);
}
