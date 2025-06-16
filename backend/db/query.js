const pool = require('./pool');

require('dotenv').config();

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
async function getRegion(){
    try{
        const result = pool.query(`SELECT id,region FROM region`)
        return result;
    }catch(error){
        console.log("error fetching region",error)
    }

}



async function main(){

    
}
main();

module.exports = {getRegion}