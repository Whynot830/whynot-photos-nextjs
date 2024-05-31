'use client'

import { fetchUserData, logout as serverLogout, signIn as serverSignIn } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)

    const fetchAndSetUser = async () => {
        const userData = await fetchUserData()
        userData && setUser(userData)
    }

    const login = async (values) => {
        const response = await serverSignIn(values)
        if (response.message)
            return response
        setUser(response)
        router.push('/')
    }

    const logout = async () => {
        await serverLogout()
        setUser(null)
    }

    useEffect(() => {
        fetchAndSetUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
