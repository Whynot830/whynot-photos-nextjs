'use client'

import { deleteImage } from "@/app/actions"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Loader, Trash2Icon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useToast } from "./ui/use-toast"
import { useState } from "react"

const FileDeletionDialog = ({ assetId }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        setLoading(true)
        await deleteImage(assetId)
        toast({
            title: 'Image deleted successfully'
        })
        setLoading(false)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className={`${loading && 'pointer-events-none brightness-75'}`} >
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium ring-offset-background transition-colors h-10 w-10 inline-flex justify-center items-center'>
                                {loading ?
                                    <Loader className="animate-spin" />
                                    :
                                    <Trash2Icon />}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side='left'>
                            <p>Delete image</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Please confirm
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <span>Are you sure you want to delete &apos;{assetId}&apos; ?</span>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={loading}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FileDeletionDialog