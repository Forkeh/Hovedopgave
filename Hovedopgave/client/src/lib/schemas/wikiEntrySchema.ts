import { z } from 'zod';

export const wikiEntrySchema = z.object({
    type: z.string().min(1, { message: 'Type is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    content: z.string(),
});

export type WikiEntrySchema = z.infer<typeof wikiEntrySchema>;
