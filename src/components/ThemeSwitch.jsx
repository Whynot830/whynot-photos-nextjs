'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='link'
                        onClick={toggleTheme}
                        size='icon'
                    >
                        {theme === 'dark' ? <MoonIcon size={28} /> : <SunIcon size={28} />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='right'>
                    Switch theme
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ThemeSwitch