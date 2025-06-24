const express = require('express')
const router = express.Router();
const {getAllTrainers,getPokemonFromTrainer} = require("../db/query.js")

router.get('/:id/party',async(req,res)=>{
    try{

        const trainerId = req.params.id;
        const result = await getPokemonFromTrainer(trainerId)
        
        res.send(result.rows);
    }catch(error){
        console.log('unable to query trainer party',error)
    }
})
router.get('/',async(req,res)=>{
    try{
         const results = await getAllTrainers();
        
            res.send(results.rows)
    }catch(error){
        console.log("unable to query trainer",error)
    }
   
    
})

module.exports=router