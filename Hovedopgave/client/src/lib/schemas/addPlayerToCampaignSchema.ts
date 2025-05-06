import { z } from 'zod';

export const addPlayerToCampaignSchema = z.object({
    email: z.string().email('It must be a valid email'),
});

export type AddPlayerToCampaignSchema = z.infer<
    typeof addPlayerToCampaignSchema
>;
