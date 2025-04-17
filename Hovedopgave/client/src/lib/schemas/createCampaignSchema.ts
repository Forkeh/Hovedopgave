import { z } from 'zod';

export const createCampaignSchema = z.object({
    name: z.string().min(2, 'Campaign name must be at least 2 characters'),
    mapUrl: z
        .string()
        .url()
        .min(6, 'Map image URL must be at least 6 characters'),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
