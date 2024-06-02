'use client'

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

const SignInForm = () => {
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
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 max-w-sm mx-auto mt-3 md:mt-10' noValidate>
                    <h2 className="text-xl font-semibold tracking-tight">Sign in to your account</h2>
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
                    <Link href='/auth/register' className="underline-offset-4 hover:underline">Do not have an account yet?</Link>
                    <Button className='w-fit px-8' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Sign In'}</Button>
                    <FormField name="response"
                        render={({ _field }) => (
                            <span className='text-destructive dark:text-red-500 font-medium'>{errors.response?.message}</span>
                        )}>
                    </FormField>
                </form>
            </Form>
        </>
    )
}

export default SignInForm