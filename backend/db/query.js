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


async function main(){
    await addTrainer("david")
    await pool.end()
}
main();