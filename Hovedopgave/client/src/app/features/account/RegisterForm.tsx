import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAccount } from '@/lib/hooks/useAccount';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { Link } from 'react-router';

export default function RegisterForm() {
    const { registerUser } = useAccount();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            displayName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    console.log(error);
                    error.forEach((err) => {
                        if (err.includes('Email')) {
                            form.setError('email', { message: err });
                        } else if (err.includes('Password')) {
                            form.setError('password', { message: err });
                        }
                    });
                }
            },
        });
    };

    return (
        <div className='flex h-full w-full animate-in items-center justify-center fade-in'>
            <div className='dnd-gradient-bg prose w-full max-w-md rounded-lg p-6 text-yellow-500 shadow-sm'>
                <h1 className='mb-6 text-center text-yellow-100'>
                    Register account
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Email'
                                            className='bg-orange-50 text-black'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='displayName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>
                                        Display name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Display name'
                                            className='bg-orange-50 text-black'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Password'
                                            className='bg-orange-50 text-black'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Confirm Password'
                                            className='bg-orange-50 text-black'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full cursor-pointer'
                            disabled={
                                !form.formState.isValid ||
                                form.formState.isSubmitting
                            }
                        >
                            Sign up
                        </Button>
                    </form>
                </Form>
                <div className='mt-4 text-center text-sm'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='cursor-pointer text-yellow-100 hover:underline'
                    >
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
}
