import { z } from 'zod';
import { WikiEntryType } from '../enums/wikiEntryType';

export const wikiEntrySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    content: z.string(),
    type: z.nativeEnum(WikiEntryType, {
        errorMap: () => ({ message: 'Please select a valid entry type' }),
    }),
});

export type WikiEntrySchema = z.infer<typeof wikiEntrySchema>;
