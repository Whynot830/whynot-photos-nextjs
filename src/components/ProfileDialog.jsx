'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User } from "lucide-react"
import { useAuth } from "./AuthContext"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

const ProfileDialog = () => {
    const { user, logout } = useAuth()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className={`rounded-md ${user ? 'cursor-pointer ' : 'pointer-events-none'}`}>
                    <AvatarFallback className='rounded-md text-lg'>{user?.username?.charAt(0).toUpperCase() || <User />}</AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                        Your account info
                    </DialogDescription>
                </DialogHeader>
                <p>
                    Username: <span className="font-semibold">{user?.username}</span>
                </p>
                <p>
                    E-mail: <span className="font-semibold">{user?.email}</span>
                </p>
                <DialogClose asChild>
                    <Button className='w-fit' onClick={() => logout()}>Log out</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog