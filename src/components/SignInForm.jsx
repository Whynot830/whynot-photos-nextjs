'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';

const SignInForm = () => {
    const router = useRouter()
    const inputRef = useRef()
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })
    const { login } = useAuth()
    const { handleSubmit, control, setError, formState: { errors, isSubmitting } } = form

    const onSubmit = async (values) => {
        const response = await login(values)
        if (response.status === 500)
            router.push('/error')
        response && setError('response', response)
    }

    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => setIsPassVisible(prev => !prev)

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])

    return (
        <>
            <Card className='max-w-md mx-auto mt-10 bg-background/80'>
                <CardHeader>
                    <CardTitle className='text-xl '>
                        Sign in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5' noValidate>

                            <FormField
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} ref={inputRef} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="flex relative items-center justify-end">
                                            <FormControl>
                                                <Input type={isPassVisible ? 'text' : 'password'} {...field} />
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
                            <Link href='/auth/register?skip=true' className="underline-offset-4 hover:underline">Do not have an account yet?</Link>
                            <Button className='w-fit px-8' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Sign In'}</Button>
                            {errors.response &&
                                <FormField name="response"
                                    render={({ _field }) => (
                                        <span className='text-destructive dark:text-red-500 font-medium'>{errors.response.message}</span>
                                    )}>
                                </FormField>
                            }

                        </form>
                    </Form>
                </CardContent>

            </Card>

        </>
    )
}

export default SignInForm