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
        <section className='prose flex min-h-[80vh] flex-col items-center justify-center'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-sm'>
                <h1 className='mb-6 text-center'>Register account</h1>

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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Email'
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
                                    <FormLabel>Display name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Display name'
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Password'
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
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Confirm Password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full'
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
                        className='text-blue-600 hover:underline'
                    >
                        Sign in here
                    </Link>
                </div>
            </div>
        </section>
    );
}
