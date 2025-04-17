import { z } from 'zod';

export const createCampaignSchema = z.object({
    Name: z.string().min(2, 'Campaign name must be at least 2 characters'),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
