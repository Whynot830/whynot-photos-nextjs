'use client'

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { useAuth } from "./AuthContext";

const ImageClientPage = ({ image }) => {
    const { user } = useAuth()
    let tempSize = image.size
    const sizes = ['B', 'KB', 'MB']
    let sizeUnitIdx = 0
    while (tempSize > 1000) {
        tempSize /= 1000
        sizeUnitIdx += 1
    }
    return (
        <div className="absolute inset-0 flex justify-center">
            <div className="absolute z-50 top-14 xs:top-3">
                <HoverCard openDelay={100} closeDelay={200}>
                    <HoverCardTrigger asChild>
                        <Button className='p-0' variant='link'>
                            <InfoIcon size={28} />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent side='bottom' className='w-fit'>
                        <p className="font-medium">
                            <span>ID: {image._id}</span>
                            <br />
                            <span>Filename: {image.filename}</span>
                            <br />
                            <span>Uploaded: {new Date(image.createdAt).toLocaleString()}</span>
                            <br />
                            <span>Original size: {parseFloat(tempSize?.toFixed(2))} {sizes[sizeUnitIdx]}</span>
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            {user &&
                <>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/images/${user.id}/${image.filename}`}
                        fill
                        priority={true}
                        quality={1}
                        alt={`${image.filename}`}
                        className='-z-10 object-cover !blur-xl brightness-50'
                    />
                    <Image
                        overrideSrc={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/images/${user.id}/${image.filename}`}
                        fill
                        sizes="100vw"
                        quality={100}
                        alt={`${image.filename}`}
                        className='object-scale-down'
                    />
                </>
            }

        </div>
    )
}
export default ImageClientPage