const express = require('express')
const router = express.Router();
const { insertPokemonIntoTrainer_pokemon, getPokemonCollectionFromTrainer, DeletePokemonFromCollection} = require("../db/query/collection.js");
const { getAllTrainers } = require('../db/query/trainer.js');
const {getPartyFromTrainer,removePokemonFromParty, addOrUpdatePokemonToParty} =require('../db/query/party.js');
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
// router.post('/party/addback',async(req,res)=>{
//     try{
//         const {trainerId,pokemonId} = req.body;
//         await addOrUpdatePokemonToParty(trainerId,pokemonId)
//         res.sendStatus(200)
//     }catch(error){
//         console.log('error in api/trainer/party/addback')
//     }
// })
//
router.post('/:id/party',asyncHandler(async(req,res)=>{
      
        const trainerId = req.params.id;
        const {pokemonId} = req.body;
        
        const result = await addOrUpdatePokemonToParty(trainerId,pokemonId)
        
        if(!result){
            throw new Error('inserting pokemon to party query failed')
        }
        if(result === 'inserted')
        {
            res.json({success:true,action:'inserted'})
        }
        if(result==='updated'){
            res.json({success:true,action:'updated'})
        }
        
    
}))
//
router.delete('/:id/pokemonCollection/:pokemonId',asyncHandler(async(req,res)=>{
    
    const {trainerId,pokemonId} = req.params;
    await DeletePokemonFromCollection(trainerId,pokemonId)
    
    res.sendStatus(200)
    
    
}))

router.get('/:id/pokemonCollection',asyncHandler(async(req,res)=>{
    const trainerId = req.params.id;
    const result = await getPokemonCollectionFromTrainer(trainerId);
    if(!result){
        throw new Error('getPokemonCollectionFromTrainer query failed')
    }

    res.send({success:true,data:result})
}))

router.get('/:id/party',asyncHandler(async(req,res)=>{

        const trainerId = req.params.id;
        const result = await getPartyFromTrainer(trainerId)
        if(!result){
            throw new Error('getPartyFromTrainer query failed')
        }
        
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