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
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema';
import { useAccount } from '@/lib/hooks/useAccount';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/campaigns');
                console.log('Login successful!');
            },
            onError: () => {
                toast('Error signing in');
            },
        });
    };

    return (
        <div className='flex h-full w-full animate-in items-center justify-center fade-in'>
            <div className='dnd-gradient-bg prose w-full max-w-md rounded-lg p-6 text-yellow-500 shadow-sm'>
                <h1 className='mb-6 text-center text-yellow-100'>Sign in</h1>
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
                            name='password'
                            render={({ field }) => (
                                <FormItem className=''>
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
                        <Button
                            type='submit'
                            className='w-full cursor-pointer'
                            disabled={
                                !form.formState.isValid ||
                                form.formState.isSubmitting
                            }
                        >
                            Sign in
                        </Button>
                    </form>
                </Form>
                <div className='mt-4 text-center text-sm'>
                    Don't have an account?{' '}
                    <Link
                        to='/register'
                        className='cursor-pointer text-yellow-100 hover:underline'
                    >
                        Sign up here!
                    </Link>
                </div>
            </div>
        </div>
    );
}
