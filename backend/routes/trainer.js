const express = require('express')
const router = express.Router();
const {getAllTrainers,getPokemonFromTrainer, insertPokemonIntoTrainer_pokemon,removePokemonFromParty} = require("../db/query.js")



router.post('/party/remove',async(req,res)=>{
    const {trainerId, pokemonId} = req.body;
    try{
        await removePokemonFromParty(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log('unable to update pokemon party status',error)
    }
})
router.post('/party',async(req,res)=>{
    try{    
        const {trainerId, pokemonId} = req.body;
        console.log(trainerId,pokemonId)
        const result = await insertPokemonIntoTrainer_pokemon(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log("failed to insert pokemon into party",error)
    }
})

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