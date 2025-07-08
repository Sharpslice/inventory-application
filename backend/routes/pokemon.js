const { getAllMovesFromPokemon } = require("../db/query");

const express = require('express');

const router = express.Router();

router.get('/:id/moveset',async(req,res)=>{
    try{
        const pokemonId = req.params.id;
        console.log('pokemonId, ',pokemonId)
        const result = await getAllMovesFromPokemon(pokemonId);
        res.send(result);
    }catch(error){
        console.log('Error in /api/pokemon/:id/moveset')
    }
    
});
module.exports=router