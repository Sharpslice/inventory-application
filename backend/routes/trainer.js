const express = require('express')
const router = express.Router();
const { insertPokemonIntoTrainer_pokemon, getPokemonCollectionFromTrainer, DeletePokemonFromCollection} = require("../db/query/collection.js");
const { getAllTrainers } = require('../db/query/trainer.js');
const {addPokemonBackToParty,getPartyFromTrainer,getPartySize,removePokemonFromParty} =require('../db/query/party.js');
const {asyncHandler} = require('../utlity/asyncHandler.js')

router.post('/party/remove',async(req,res)=>{
    const {trainerId, pokemonId} = req.body;
    try{
        await removePokemonFromParty(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log('Error in /api/trainer/party/remove route',error.message)
        
    }
})
router.post('/party/addback',async(req,res)=>{
    try{
        const {trainerId,pokemonId} = req.body;
        await addPokemonBackToParty(trainerId,pokemonId)
        res.sendStatus(200)
    }catch(error){
        console.log('error in api/trainer/party/addback')
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

router.get('/:id/party',asyncHandler(async(req,res)=>{

        const trainerId = req.params.id;
        const result = await getPartyFromTrainer(trainerId)
        if(!result){
            throw new Error('getPartyFromTrainer query failed')
        }
        console.log(result)
        res.json({success:true,data:result});
   
}))

router.get('/',asyncHandler(async(req,res)=>{

    const results = await getAllTrainers();
    if(!results){
        throw new Error('getAllTrainer query failed')
    }
   

    res.json({success:true,data:results})
    
}))

module.exports=router