'use client'

import transition from "@/lib/transition"
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('dark')

    const setNewTheme = (newTheme) => {
        transition(() => setTheme(newTheme))
    }
    const toggleTheme = () => {
        transition(() => (
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        ))
    }
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setNewTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
