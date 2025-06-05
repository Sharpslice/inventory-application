const pool = require('./pool');

require('dotenv').config();

async function addTrainer(name){
    await pool.query(`
            INSERT INTO trainer (name)
            VALUES ($1)
        
        `,[name])
}




async function main(){
    await addTrainer("david")
    await pool.end()
}
main();