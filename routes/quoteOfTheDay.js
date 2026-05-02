import express from "express" ;
import supabase from '../db/db.js' ;
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('', async(req , res) =>{
    try{
        const today = new Date() ;
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const {data ,error} = await supabase
                                .from('quotes')
                                .select('*')
        if(error){
            return res.status(404).json({error : error.message}) ;
        }
        if(!data || data.length == 0){
            return res.status(404).json({message :  "No Quote Found"})
        }
        const index = dayOfYear % data.length;
        return res.status(200).json(data[index]);      
         
    }catch(error){
        res.status(500).json({error : error.message}) 
    }
});

export default router ;