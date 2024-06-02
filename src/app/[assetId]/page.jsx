import { fetchImageData } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ImagePage = async ({ params: { assetId } }) => {
    const image = await fetchImageData(assetId)
    if (!image)
        redirect('/')

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
                    <HoverCardContent side='bottom' className='xs:w-fit'>
                        <p className="overflow-hidden text-ellipsis font-medium">
                            <span>ID: {image.id}</span>
                            <br />
                            <span>Filename: {image.filename}</span>
                            <br />
                            <span>Format: {image.format}</span>
                            <br />
                            <span>Uploaded: {new Date(image.createdAt).toLocaleString()}</span>
                            <br />
                            <span>Original size: {parseFloat(tempSize?.toFixed(2))} {sizes[sizeUnitIdx]}</span>
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <Image
                src={image.url}
                fill
                priority={true}
                quality={1}
                alt={`${image.filename}`}
                className='-z-10 object-cover !blur-xl brightness-50'
            />
            <Image
                overrideSrc={image.url}
                fill
                sizes="100vw"
                quality={100}
                alt={image.url}
                className='object-scale-down'
            />

        </div>
    )
}

export default ImagePage