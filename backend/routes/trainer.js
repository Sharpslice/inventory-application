const express = require('express')
const router = express.Router();
const {getAllTrainers,getPartyFromTrainer, insertPokemonIntoTrainer_pokemon,removePokemonFromParty, getPokemonCollectionFromTrainer, DeletePokemonFromCollection} = require("../db/query.js")



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
router.post('/pokemonCollection',async(req,res)=>{
    const {trainerId,pokemonId} = req.body
    await DeletePokemonFromCollection(trainerId,pokemonId)
})
router.get('/:id/pokemonCollection',async(req,res)=>{
    const trainerId = req.params.id;
    const result = await getPokemonCollectionFromTrainer(trainerId);
    res.send(result.rows)
})

router.get('/:id/party',async(req,res)=>{
    try{

        const trainerId = req.params.id;
        const result = await getPartyFromTrainer(trainerId)
        
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