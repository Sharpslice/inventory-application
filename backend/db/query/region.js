const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' });

async function getRegion(){
    try{
        const result = await pool.query(`SELECT id,region FROM region`)
       
        return result.rows;
    }catch(error){
        console.log("DB error in getRegion",error.message)
    }

}

async function getPokemonFromRegion(id,offset,limit ){
    try{
        const result = await pool.query(`
        SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
        pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
        FROM pokemon
        INNER JOIN region_pokemon ON pokemon.id = region_pokemon.pokemon_id
        INNER JOIN region ON region.id = region_pokemon.region_id
        WHERE region.id = '${id}'
        LIMIT ${limit} OFFSET ${offset}
        
        `)
        return result.rows;
    }catch(error){
        console.log('DB error in getPokemonFromRegion',error.message)
    }
    
}

module.exports = {getRegion,getPokemonFromRegion}