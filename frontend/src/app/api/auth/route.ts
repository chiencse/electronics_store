export async function POST(req: Request) {
  const res = await req.json();
  const reqToken = res.token;
  if (!reqToken)
    return Response.json(
      { message: 'No token provided' },
      { status: 400, statusText: 'Bad Request' }
    );
  return Response.json(
    { res },
    {
      status: 200,
      statusText: 'OK',
      headers: { 'set-cookie': `token=${reqToken}; path=/; HttpOnly` },
    }
  );
}
