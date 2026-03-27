import express from 'express' ;
import supabase from '../db/db.js';
import { validate } from '../middlewares/validate.js';
import { sourceSchema } from '../schemas/sourceSchema.js';

const router = express.Router() ;

router.get('/' , validate(sourceSchema) ,async(req , res) => {
    const {source} = req.query ;
    try{
        const {data , error} = await supabase
            .from('quotes')
            .select()
            .eq('source' , source)

        if (error){
            return res.status(500).json({error : error.message});
        }
        if(!data || data.length == 0){
            return res.status(404).json({message :  "No Quote Found"})
        }
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message : "Failed to Fetch" , error : error.message});
    }
});

export default router ;