const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' });

async function getAllTrainers(){
    try{
        const response = await pool.query(`
        SELECT id,name FROM trainer
        `)
        return response.rows;
    }catch(error){
        console.log("DB error in getAllTrainer",error.message)
    }
    
}

async function addTrainer(name){
    await pool.query(`
            INSERT INTO trainer (name)
            VALUES ($1)
        
        `,[name])
}
async function deleteTrainer(id){
    await pool.query(`
        DELETE FROM trainer WHERE id= ($1)
    `,[id])
}

module.exports={getAllTrainers,addTrainer,deleteTrainer}