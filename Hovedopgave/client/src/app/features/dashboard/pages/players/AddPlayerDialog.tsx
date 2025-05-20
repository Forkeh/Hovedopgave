import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    addPlayerToCampaignSchema,
    AddPlayerToCampaignSchema,
} from '@/lib/schemas/addPlayerToCampaignSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    isAddPlayerDialogOpen: boolean;
    setIsAddPlayerDialogOpen: (open: boolean) => void;
    onAddPlayer: (data: AddPlayerToCampaignSchema) => void;
};

export default function AddPlayerDialog({
    isAddPlayerDialogOpen,
    setIsAddPlayerDialogOpen,
    onAddPlayer,
}: Props) {
    const form = useForm<AddPlayerToCampaignSchema>({
        resolver: zodResolver(addPlayerToCampaignSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
        },
    });

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (!isAddPlayerDialogOpen) {
            form.reset();
        }
    }, [isAddPlayerDialogOpen, form]);

    const handleSubmit = (data: AddPlayerToCampaignSchema) => {
        onAddPlayer(data);
    };

    return (
        <Dialog
            open={isAddPlayerDialogOpen}
            onOpenChange={setIsAddPlayerDialogOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        Add player to campaign
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Player email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Type player email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-between'>
                            <Button
                                className='cursor-pointer'
                                type='button'
                                variant='outline'
                                onClick={() => setIsAddPlayerDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className='cursor-pointer'
                                type='submit'
                                disabled={
                                    !form.formState.isValid ||
                                    form.formState.isSubmitting
                                }
                            >
                                Add Player
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
