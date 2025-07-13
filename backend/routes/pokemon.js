const { getAllMovesFromPokemon } = require("../db/query/pokemon.js");

const express = require('express');

const router = express.Router();

router.get('/:id/moveset',async(req,res)=>{
    try{
        const pokemonId = req.params.id;
       
        const result = await getAllMovesFromPokemon(pokemonId);
        res.send(result);
    }catch(error){
        console.log('Error in /api/pokemon/:id/moveset')
    }
    
});
module.exports=router