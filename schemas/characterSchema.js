import {z} from 'zod' ;

export const characterSchema = z.object({
    character : z.string().min(1 , "Character is required")
})