const express = require('express')
const router = express.Router();
const { insertPokemonIntoTrainer_pokemon, getPokemonCollectionFromTrainer, DeletePokemonFromCollection} = require("../db/query/collection.js");
const { getAllTrainers } = require('../db/query/trainer.js');
const {getPartyFromTrainer,removePokemonFromParty, addOrUpdatePokemonToParty} =require('../db/query/party.js');
const {asyncHandler} = require('../utlity/asyncHandler.js');
const { getPokemonsMoveset, addMoveToPokemon } = require('../db/query/moves.js');




router.get('/:trainerId/:pokemonId/moveset',asyncHandler(async(req,res)=>{

    const {trainerId,pokemonId} = req.params;
   
    const result = await getPokemonsMoveset(trainerId,pokemonId);
    
    if(!result){
        throw new Error('getting pokemon moveset query failed');
    }
    //pokemon does not know any moves
    if(result.length===0){
        res.json({success:false})
    }
    else{
        res.json({success:true,data:result})
    }
    
    
}));


router.post('/:trainerId/:pokemonId/moveset',asyncHandler(async(req,res)=>{

    const {trainerId,pokemonId} = req.params;
    const {moveId,slotId}= req.body;
    console.log(`moveId: ${moveId}\nslotId: ${slotId}`)
    try{
        await addMoveToPokemon(trainerId,pokemonId,moveId,slotId)
        console.log('success!')
        res.status(201)
    }catch(error){
        if(error.message ==='Duplicate move'){
            res.status(409).json({error: 'Duplicate move'})
        }
        else if(error.message === 'Slot is filled'){
            res.status(400).json({error:'Slot is filled'})
        }
        else if(error.message === 'No Slots available'){
            res.status(400).json({error:'No Slots available'})
        }
        else{
            res.status(500).json({error:'Internal Server error'})
        }
    }

}));


router.patch('/:trainerId/party/:pokemonId',asyncHandler(async(req,res)=>{
    const {trainerId,pokemonId} = req.params;
        const result = await removePokemonFromParty(trainerId,pokemonId)
        if(!result)
        {
            throw new Error("remove pokemon from party query failed");
        }
        res.json({success:true})
   
}))

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

router.delete('/:trainerId/pokemonCollection/:pokemonId',asyncHandler(async(req,res)=>{
    
    const {trainerId,pokemonId} = req.params;
    console.log(trainerId,pokemonId)
    const result = await DeletePokemonFromCollection(trainerId,pokemonId)
    if(!result){
        throw new Error('Deleting pokemon from collection query failed')
    }
    res.json({success:true})
    
    
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