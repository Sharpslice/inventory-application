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
async function getPokemonFromRegion(id,offset , limit ){
    console.log(offset,limit)
    const result = await pool.query(`
        SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite
        FROM pokemon
        INNER JOIN region_pokemon ON pokemon.id = region_pokemon.pokemon_id
        INNER JOIN region ON region.id = region_pokemon.region_id
        WHERE region.id = '${id}'
        LIMIT ${limit} OFFSET ${offset}
        
    `)
    return result;
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

module.exports = {getRegion,getPokemonFromRegion}