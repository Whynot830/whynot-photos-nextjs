'use client'

import Link from "next/link"
import { useParams, usePathname } from 'next/navigation'
import FileDeletionDialog from './FileDeletionDialog'
import FileUploadDialog from './FileUploadDialog'
import ProfileDialog from "./ProfileDialog"
import ThemeSwitch from "./ThemeSwitch"

const Header = () => {
    const pathname = usePathname()
    const { filename } = useParams()
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="m-auto py-3 px-6 sm:px-8 md:px-14 flex max-w-[1440px]  justify-between">
                <div className="flex xs:gap-4 md:gap-8 items-center">
                    <Link href='/' className="w-fit text-xl leading-none tracking-tight font-semibold">
                        WhyNot Photos
                    </Link>
                    <ThemeSwitch />

                </div>

                <div className='flex gap-2 xs:gap-4 md:gap-8'>
                    {filename && (
                        <FileDeletionDialog filename={filename} />
                    )}
                    {pathname === '/' && (
                        <FileUploadDialog side='left' />
                    )}
                    <ProfileDialog />

                </div>
            </div>
        </header >
    )
}

export default Header
