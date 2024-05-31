'use client'

import { uploadImage } from "@/app/actions";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const FileUploadModal = ({ side = 'bottom' }) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const inputRef = useRef()

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file)
            return
        if (file.size > 5000000)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'The image exceeds the maximum file size limit of 5MB. Please upload a smaller file'
            })
        else setFile(file)
    }

    const handleOnOpenChange = (isOpen) => {
        setOpen(isOpen)
        !isOpen && setFile(null)
    }

    const uploadFile = async () => {
        const formData = new FormData()
        formData.append('image', file)
        setLoading(true)
        const response = await uploadImage(formData)
        setLoading(false)
        if (response.message)
            toast({
                title: 'Error',
                description: response.message,
                variant: 'destructive'
            })
        else {
            setFile(null)
            setOpen(false)
            toast({
                title: 'Image uploaded successfully'
            })
            scrollTo(0, 0)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={handleOnOpenChange}>
                <DialogTrigger >
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium ring-offset-background transition-colors h-10 w-10 inline-flex justify-center items-center">
                                    <ImagePlus />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side={side}>
                                <p>Upload new image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload new image</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Supported types: JPG, PNG, WEBP. Maximum size: 5MB
                    </DialogDescription>
                    <input onChange={handleFileChange} accept="image/*" type="file" hidden ref={inputRef} />
                    <span className='overflow-hidden text-nowrap text-ellipsis' >Selected file: {file?.name || 'None'}</span>
                    <Button
                        disabled={loading}
                        variant={file ? 'outline' : 'default'}
                        onClick={() => inputRef.current.click()}
                    >
                        Choose file
                    </Button>
                    <DialogClose asChild>
                        <>
                            {file && (
                                <Button
                                    disabled={loading}
                                    onClick={uploadFile}
                                >
                                    {loading ? 'Uploading...' : 'Upload Image'}
                                </Button>
                            )}
                        </>
                    </DialogClose>
                </DialogContent>
            </Dialog>



            {/* <Modal
                placement="center"

                isOpen={isOpen}
                onClose={onClose}

            >
                <ModalContent className="max-w-xs">
                    {(onClose) => (
                        <>
                            <ModalHeader>Upload Image</ModalHeader>
                            <ModalBody>
                                <input onChange={handleChange}
                                    accept="image/*"
                                    type="file"
                                    hidden
                                    ref={inputRef} />
                                <Button onPress={() => inputRef.current.click()}>
                                    {file ?
                                        (
                                            <h2>{file.name.length > 30 ? file.name.substr(0, 30) + '...' : file.name}</h2>
                                        )
                                        :
                                        (
                                            'Choose file'
                                        )}
                                </Button>
                                {file && (
                                    <Button onPress={uploadFile}>Upload</Button>
                                )}
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button color='warning' variant="light" onPress={() => setFile(null)}>
                                    Clear file
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal> */}

        </div>
    );
};

export default FileUploadModal;