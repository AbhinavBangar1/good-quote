import {z} from 'zod' ;

export const sourceSchema = z.object({
    source : z.string().min(1 , "Source is required")
})