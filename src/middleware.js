import { fetchUserData } from "./app/actions";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
    const accessToken = cookies().get('accessToken')
    const refreshToken = cookies().get('refreshToken')
    const isAccessTokenValid = accessToken && accessToken.value !== ''
    const isRefreshTokenValid = refreshToken && refreshToken.value !== ''

    if (!isAccessTokenValid && isRefreshTokenValid) {
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
    const isSkipping = url.searchParams.get('skip') === 'true' || url.search === '?skip=true'

    if ((!isSkipping || isAccessTokenValid) && requestUrl.pathname.startsWith('/auth')) {
        const userData = await fetchUserData()
        if (!!userData)
            return NextResponse.redirect(new URL('/', requestUrl))
    }
}
