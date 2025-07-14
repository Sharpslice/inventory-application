const { getAllMovesFromPokemon } = require("../db/query/moves.js");

const express = require('express');
const { getPokemonsType } = require("../db/query/pokemon.js");

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

router.get("/:id/types",async(req,res)=>{
    
        const id = req.params.id;
        const response = await getPokemonsType(id)
        if(!response){
            throw new Error('Error in /api/pokemon/:id/types')
        }
        res.json({success:true,data:response})
   
})
module.exports=router