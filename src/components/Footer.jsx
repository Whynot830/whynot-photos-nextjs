import { CopyrightIcon } from "lucide-react"

const Footer = () => {
    return (
        <footer className="p-3 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex justify-center items-center gap-2">
                <span className='font-medium'>
                    <CopyrightIcon size={14} />
                </span>
                <span>whynot 2024 &mdash; All rights reversed</span>
            </div>
            <span className="font-medium">
            </span>
        </footer>
    )
}

export default Footer