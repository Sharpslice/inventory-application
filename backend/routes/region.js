const axios = require("axios");
const express = require('express');
const router = express.Router();
const {getRegion} =require("../db/query.js")

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