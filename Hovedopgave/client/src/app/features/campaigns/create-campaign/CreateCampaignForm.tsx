import {
    createCampaignSchema,
    CreateCampaignSchema,
} from '@/lib/schemas/createCampaignSchema';
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
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useNavigate } from 'react-router';

export default function CreateCampaignForm() {
    const { createCampaign } = useCampaigns();
    const navigate = useNavigate();

    const form = useForm<CreateCampaignSchema>({
        resolver: zodResolver(createCampaignSchema),
        mode: 'onTouched',
        defaultValues: {
            Name: '',
        },
    });

    const onSubmit = async (data: CreateCampaignSchema) => {
        console.log(data);

        createCampaign.mutate(data, {
            onSuccess: () => navigate(`/campaigns`),
        });
    };

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='prose w-full max-w-md rounded-lg bg-white p-6 shadow-sm'>
                <h1 className='mb-6 text-center'>Create new campaign</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='Name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Campaign name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Type campaign name'
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
                                form.formState.isSubmitting ||
                                createCampaign.isPending
                            }
                        >
                            Create Campaign
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
