import { fetchUserData } from "./app/actions";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
    const accessToken = cookies().get('accessToken')
    const refreshToken = cookies().get('refreshToken')
    if (!accessToken && refreshToken && refreshToken.value !== '') {
        const response = await fetch(`${process.env.SERVER_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                cookie: cookies()
            },
        })
        return NextResponse.rewrite(new URL(request.nextUrl), {
            headers: {
                'Set-Cookie': response.headers.getSetCookie()
            }
        })
    }
    const { nextUrl: requestUrl } = request
    const url = new URL(requestUrl)
    const isSkipping = url.searchParams.get('skip') === 'true'

    if ((!isSkipping || accessToken) && requestUrl.pathname.startsWith('/auth')) {
        const userData = await fetchUserData()
        if (!!userData)
            return NextResponse.redirect(new URL('/', requestUrl))
    }
}
