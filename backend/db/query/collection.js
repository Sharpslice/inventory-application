const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' });



async function getPokemonCollectionFromTrainer(id){
    try{
        const response = await pool.query(`
            SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
            pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
            FROM pokemon
            INNER JOIN trainer_pokemon ON trainer_pokemon.pokemon_id = pokemon.id
            INNER JOIN trainer ON trainer.id = trainer_pokemon.trainer_id
            WHERE trainer.id = ${id} AND trainer_pokemon.inParty = false
        
        `)
        return response.rows;
    }catch(error){
        console.log("DB error in getPokemonCollectionFromTrainer",error.message)
    }
    
}

async function insertPokemonIntoTrainer_pokemon(trainer_id, pokemon_id){
    try{
        const result = await pool.query(`
        INSERT INTO trainer_pokemon (trainer_id,pokemon_id,nickname,level,inParty)
        VALUES ($1,$2,null,null,true)
        `,[trainer_id,pokemon_id])
        return result.rows;
    }catch(error)
    {
        console.log('DB error in insertPokemonIntoTrainer_pokemon',error.message)
    }
    
}


async function DeletePokemonFromCollection(trainerId,pokemonId){
    try{
        const result = await pool.query(`
            DELETE FROM trainer_pokemon 
            WHERE trainer_id = $1 AND pokemon_id = $2
        `,[trainerId,pokemonId])
    
        return result.rowCount > 0
    }catch(error){
        console.log("DB error in DeletePokemonFromCollection",error.message)
    }
    
}









module.exports = {DeletePokemonFromCollection,getPokemonCollectionFromTrainer,insertPokemonIntoTrainer_pokemon}