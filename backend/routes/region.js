const axios = require("axios");
const express = require('express');
const router = express.Router();
const {getPokemonsType} =require("../db/query/pokemon.js");
const { getRegion, getPokemonFromRegion } = require("../db/query/region.js");


router.get("/:regionId/pokemon",async (req,res)=>{
   
    try{

        const regionId = req.params.regionId;
        const offset = req.query.offset;
        const limit = req.query.limit;
        
      
        const result = await getPokemonFromRegion(regionId,offset,limit)
        res.send(result);
    }catch(error){
        console.error("failed to send regionId",error)
        res.status(500).send("server error")
    }
    
    
})
router.get("/pokemon/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await getPokemonsType(id)
        
        res.send(response)
    }catch(error){
        console.error("error querying pokemon type", error)
    }
})

router.get("/", async (req,res)=>{
    try{
        const result = await getRegion();
        res.send(result)
    } catch (error){
        console.error("error inside backend",error);
        res.status(500).send("server error")
    }
})




module.exports=router