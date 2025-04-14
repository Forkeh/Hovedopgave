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
        <>
            <h1 className='text-center text-2xl font-bold'>Sign in</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-2/3 space-y-6'
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
                    <Button
                        type='submit'
                        disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                        }
                    >
                        Sign in
                    </Button>
                </form>
            </Form>
            <div>
                Don't have an account?{' '}
                <Link to={'/register'}>Sign up here!</Link>
            </div>
        </>
    );
}
