import express from 'express' ;
import supabase from '../db/db.js' ;
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router() ;

router.get('/' , async(req , res) => {
    try{
        const {data , error} = await supabase
            .from('quotes')
            .select()
        console.log(data) ;
        console.log(error) ;
        if (error){
            return res.status(500).json({error : error.message});
        }
        if(!data || data.length == 0){
            return res.status(404).json({message :  "No Quote Found"})
        }
        const random = data[Math.floor(Math.random() * data.length)] ;
        res.status(200).json(random) ;
    }
    catch(error){
        res.status(500).json({message : "Failed to Fetch" , error : error.message})
    }

});

export default router ;