'use client'

import { signUp } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import transition from "@/lib/transition"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

const SignUpForm = () => {
    const router = useRouter()
    const inputRef = useRef()
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    })
    const { handleSubmit, setError, formState: { errors, isSubmitting } } = form

    const onSubmit = async (values) => {
        const response = await signUp(values)
        if (response.status === 200) {
            form.reset()
            setOpen(true)
        }
        if (response.status === 500)
            router.push('/error')
        response && setError('response', { message: response.message, status: response.status, errors: response.errors })
    }

    const [open, setOpen] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => transition(() => setIsPassVisible(!isPassVisible))

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])

    return (
        <>
            <Card className='max-w-md mx-auto mt-10 bg-background/80'>
                <CardHeader>
                    <CardTitle className='text-xl'>
                        Create your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 " noValidate>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username123" {...field} ref={inputRef} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@mail.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="flex relative items-center justify-end">
                                            <FormControl>
                                                <Input type={isPassVisible ? 'text' : 'password'} placeholder="#strongPassword.2134!" {...field} />
                                            </FormControl>
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeIcon className='text-2xl' /> :
                                                        <EyeOffIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password confirmation</FormLabel>
                                        <FormControl>
                                            <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Link href='/auth/login?skip=true' className="underline-offset-4 hover:underline">Already have an account?</Link>
                            <Button className='w-fit px-8' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Sign Up'}</Button>
                            {errors.response &&
                                <FormField name="response"
                                    render={({ _field }) => (
                                        <>
                                            <span className={`font-medium ${errors.response.status === 200 ? 'text-green-600' : 'text-destructive dark:text-red-500'}`}>{errors.response.message}</span>
                                            <ul className="space-y-1 font-medium">
                                                {errors.response.errors?.map((err, idx) => (
                                                    <li key={idx} className='flex gap-x-2 text-destructive dark:text-red-500'> {err.msg}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}>
                                </FormField>
                            }
                        </form>
                    </Form >
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className='text-start'>
                        <DialogTitle>Sign Up Successful</DialogTitle>
                    </DialogHeader>
                    <p>Check your email for the activation link</p>
                    <DialogFooter className='items-end w-full'>
                        <DialogClose asChild >
                            <Button className='w-fit' onClick={() => setOpen(false)}>OK</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default SignUpForm