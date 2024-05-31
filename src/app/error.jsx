'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'

export default function Error({
    error, reset
}) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className="m-auto w-fit my-20 space-y-4">
            <h2 className='text-xl md:text-2xl font-medium'>Oops...</h2>
            <h2 className='text-xl md:text-2xl font-medium'>Something went wrong (status: {error.status ?? 500})</h2>
            {error?.message && (
                <h3 className='text-xl md:text-2xl font-medium'>Error message: {error.message}</h3>
            )}
            <div className='flex justify-end gap-4'>
            <Button onClick={() => reset()}>Try again</Button>
            {pathname !== '/' && (
                <Button onClick={() => router.push('/')}>Go to main page</Button>
            )}
            </div>
           
        </div>
    )
}