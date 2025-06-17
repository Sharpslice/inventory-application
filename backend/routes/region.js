const axios = require("axios");
const express = require('express');
const router = express.Router();
const {getRegion,getPokemonFromRegion} =require("../db/query.js")


router.get("/:regionId/pokemon",async (req,res)=>{
   
    try{

        const regionId = req.params.regionId;
        const result = await getPokemonFromRegion(regionId)
        res.send(result.rows);
    }catch(error){
        console.error("failed to send regionId",error)
        res.status(500).send("server error")
    }
    
    
})


router.get("/", async (req,res)=>{
    try{
        const result = await getRegion();
        res.send(result.rows)
    } catch (error){
        console.error("error inside backend",error);
        res.status(500).send("server error")
    }
})




module.exports=router