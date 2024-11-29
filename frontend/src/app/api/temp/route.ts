import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('token')
    return Response.json({token: sessionToken}, {status: 200, statusText: 'OK'})
}