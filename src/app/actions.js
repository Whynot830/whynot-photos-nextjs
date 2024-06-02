'use server'

import parseCookie from "@/lib/cookie-parser"
import { revalidatePath } from "next/cache"
import { cookies, } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(values) {
    const { username, password } = values
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const userData = await response.json()
        const rawCookies = response.headers.getSetCookie()
        for (let rawCookie of rawCookies) {
            const cookie = parseCookie(rawCookie)
            cookies().set(cookie)
        }
        return userData
    }
    if (response.status == 401) {
        const json = await response.json()
        return json
    }
    return {
        status: 500
    }
}

export async function signUp(values) {
    const { username, email, password, passwordConfirmation } = values

    if (password !== passwordConfirmation)
        return {
            message: 'Passwords do not match'
        }
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        return {
            message: 'Sign up success',
            status: 200
        }
    }
    if (response.status == 400) {
        const json = await response.json()
        return json
    }
    return {
        status: 500
    }
}

export async function fetchUserData() {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/auth/info`, {
            headers: { cookie: cookies() }
        })
        if (response.ok) {
            const userData = await response.json()
            return userData
        }
        return null
    } catch (err) {
        return null
    }
}

export async function fetchImages() {
    const response = await fetch(`${process.env.SERVER_URL}/api/images`, {
        headers: { cookie: cookies() },
        next: { revalidate: 3600 },
    })
    if (response.ok) {
        const images = await response.json()
        return images
    }
    if (response.status === 401)
        redirect('/auth/login?skip=true')
    return { status: response.status }
}

export async function fetchImageData(assetId) {
    const response = await fetch(`${process.env.SERVER_URL}/api/images/${assetId}`, {
        headers: { cookie: cookies() }
    })
    if (response.ok) {
        const image = await response.json()
        return image
    }
    if (response.status === 401) {
        redirect('/auth/login?skip=true')
    }
    if (response.status === 404) {
        return null
    }
    redirect('/error')
}

export async function uploadImage(formData) {
    const response = await fetch(`${process.env.SERVER_URL}/api/images`, {
        method: 'POST',
        headers: {
            cookie: cookies(),
        },
        body: formData,
    })
    if (response.ok) {
        revalidatePath('/')
    }
    const json = await response.json()
    return { ...json, status: response.status }
}
export async function deleteImage(filename) {
    const response = await fetch(`${process.env.SERVER_URL}/api/images/${filename}`, {
        method: 'DELETE',
        headers: {
            cookie: cookies(),
        }
    })
    if (response.ok) {
        revalidatePath('/')
        redirect('/')
    }
    if (response.status === 401)
        redirect('/auth/login?skip=true')

    redirect('/error')
}

export async function logout() {
    cookies().set('accessToken', '')
    cookies().set('refreshToken', '')
    redirect('/auth/login?skip=true')

}