import express from 'express' ;
import supabase from '../db/db.js';
import { validate } from '../middlewares/validate.js';
import { categorySchema } from '../schemas/categorySchema.js';


const router = express.Router() ;

router.get('/' , validate(categorySchema) , async(req , res) => {
    const {category} = req.query ;
    try{
        const {data , error} = await supabase
            .from('quotes')
            .select()
            .eq('category' , category)

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