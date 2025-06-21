const express = require('express')
const router = express.Router();
const {getAllTrainers} = require("../db/query.js")


router.get('/',async(req,res)=>{
    try{
         const results = await getAllTrainers();
        
            res.send(results.rows)
    }catch(error){
        console.log("unable to query trainer",error)
    }
   
    
})

module.exports=router