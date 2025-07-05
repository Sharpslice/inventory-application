const express = require('express')
const router = express.Router();
const {getAllTrainers,getPartyFromTrainer, insertPokemonIntoTrainer_pokemon,removePokemonFromParty, getPokemonCollectionFromTrainer, DeletePokemonFromCollection, getPartySize} = require("../db/query.js")



router.post('/party/remove',async(req,res)=>{
    const {trainerId, pokemonId} = req.body;
    try{
        await removePokemonFromParty(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log('Error in /api/trainer/party/remove route',error.message)
        
    }
})
router.post('/party',async(req,res)=>{
    try{    
        const {trainerId, pokemonId} = req.body;
        console.log(trainerId,pokemonId)
        await insertPokemonIntoTrainer_pokemon(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log("Error in /api/trainer/party route",error.message)
    }
})
router.delete('/:trainerId/pokemonCollection/:pokemonId',async(req,res)=>{
    
    const {trainerId,pokemonId} = req.params;
    try{
        await DeletePokemonFromCollection(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log("Error in /api/trainer/:trainerId/pokemonCollection/:pokemonId",error.message)
    }
    
})
router.get('/:id/pokemonCollection',async(req,res)=>{
    const trainerId = req.params.id;
    const result = await getPokemonCollectionFromTrainer(trainerId);
    res.send(result)
})
router.get('/:id/party/size',async(req,res)=>{
    try{
        const trainerId = req.params.id;
        const result = await getPartySize(trainerId);
        return result;
    }catch(error){
        console.log('unable to query party size',error)
    }
})
router.get('/:id/party',async(req,res)=>{
    try{

        const trainerId = req.params.id;
        const result = await getPartyFromTrainer(trainerId)
        
        res.send(result);
    }catch(error){
        console.log('unable to query trainer party',error)
    }
})
router.get('/',async(req,res)=>{
    try{
         const results = await getAllTrainers();
        
            res.send(results)
    }catch(error){
        console.log("unable to query trainer",error)
    }
   
    
})

module.exports=router