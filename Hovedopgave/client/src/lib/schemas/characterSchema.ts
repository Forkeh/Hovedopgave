import { z } from 'zod';
import { CharacterRace } from '../enums/CharacterRace';
import { CharacterClass } from '../enums/CharacterClass';

export const characterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    race: z.nativeEnum(CharacterRace, {
        errorMap: () => ({ message: 'Please select a valid race' }),
    }),
    class: z.nativeEnum(CharacterClass, {
        errorMap: () => ({ message: 'Please select a valid race' }),
    }),
    backstory: z.string()
});

export type CharacterSchema = z.infer<typeof characterSchema>;
