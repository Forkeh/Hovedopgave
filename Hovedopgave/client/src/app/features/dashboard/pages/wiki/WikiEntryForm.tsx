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
import { useNavigate, useParams } from 'react-router';
import {
    wikiEntrySchema,
    WikiEntrySchema,
} from '@/lib/schemas/wikiEntrySchema';
import Tiptap from '@/components/rich-text-editor/TipTap';
import { WikiEntry } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useWiki } from '@/lib/hooks/useWiki';

export default function WikiEntryForm() {
    const { createCampaign } = useCampaigns();
    const navigate = useNavigate();
    const { id } = useParams();
    const { createWikiEntry } = useWiki(id);

    const form = useForm<WikiEntrySchema>({
        resolver: zodResolver(wikiEntrySchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            content: '',
            type: '',
        },
    });

    const onSubmit = async (data: WikiEntrySchema) => {
        console.log(data);

        const newEntry = {
            name: data.name,
            type: data.type,
            content: data.content,
            campaignId: id,
        } as WikiEntry;

        console.log('Entry: ', newEntry);

        createWikiEntry.mutate(newEntry, {
            onSuccess: () => console.log('success'),
        });
    };

    return (
        <div className='mt-10 flex w-full items-center justify-center'>
            <div className='prose max-w-lg rounded-lg bg-white p-6 shadow-sm'>
                <h1 className='mb-6 text-center'>Create wiki entry</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='flex gap-4'>
                            <div className='flex aspect-square w-1/3 flex-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md'>
                                <span className='text-gray-400'>Add image</span>
                            </div>
                            <div className='flex w-full flex-col justify-center'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Type entry name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='type'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder='Select entry type' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='Npc'>
                                                        <span>NPC</span>
                                                    </SelectItem>
                                                    <SelectItem value='Location'>
                                                        <span>Location</span>
                                                    </SelectItem>
                                                    <SelectItem value='Lore'>
                                                        <span>Lore</span>
                                                    </SelectItem>
                                                    <SelectItem value='Quest'>
                                                        <span>Quest</span>
                                                    </SelectItem>
                                                    <SelectItem value='Item'>
                                                        <span>Item</span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Tiptap
                                            content={field.value}
                                            onChange={(newContent) => {
                                                field.onChange(newContent);
                                            }}
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
                                form.formState.isSubmitting ||
                                createCampaign.isPending
                            }
                        >
                            Create Entry
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
