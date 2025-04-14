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
        <>
            <h1 className='text-center text-2xl font-bold'>Register account</h1>
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
                        // disabled={
                        //     !form.formState.isValid ||
                        //     form.formState.isSubmitting
                        // }
                    >
                        Sign up
                    </Button>
                </form>
            </Form>
            <Link to={'/'}>Already have an account?</Link>
        </>
    );
}
