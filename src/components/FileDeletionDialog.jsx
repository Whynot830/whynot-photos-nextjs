'use client'

import { deleteImage } from "@/app/actions"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2Icon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useToast } from "./ui/use-toast"

const FileDeletionDialog = ({ assetId }) => {
    const { toast } = useToast()
    const handleDelete = async () => {
        await deleteImage(assetId)
        toast({
            title: 'Image deleted successfully'
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium ring-offset-background transition-colors h-10 w-10 inline-flex justify-center items-center">
                                <Trash2Icon />
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
                    <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FileDeletionDialog