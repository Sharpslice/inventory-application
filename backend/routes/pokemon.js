const { getAllMovesFromPokemon } = require("../db/query/moves.js");

const express = require('express');
const { getPokemonsType } = require("../db/query/pokemon.js");
const { asyncHandler } = require("../utlity/asyncHandler.js");
const router = express.Router();

router.get('/:id/moveset',asyncHandler(async(req,res)=>{
 
        const pokemonId = req.params.id;
       
        const result = await getAllMovesFromPokemon(pokemonId);
        if(!result){
            throw new Error('error in /api/pokemon/:id/moveset')
        }
        res.send({success:true,data:result});
   
    
}));

router.get("/:id/types",async(req,res)=>{
    
        const id = req.params.id;
        const response = await getPokemonsType(id)
        if(!response){
            throw new Error('Error in /api/pokemon/:id/types')
        }
        res.json({success:true,data:response})
   
})
module.exports=router