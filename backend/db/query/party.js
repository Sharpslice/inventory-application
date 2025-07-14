const pool = require('../pool');
const { insertPokemonIntoTrainer_pokemon } = require('./collection');

require('dotenv').config({ path: __dirname + '/../.env' })

async function getPartyFromTrainer(id){
    try{
        const response = await pool.query(`
            SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
            pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
            FROM pokemon
            INNER JOIN trainer_pokemon ON trainer_pokemon.pokemon_id = pokemon.id
            INNER JOIN trainer ON trainer.id = trainer_pokemon.trainer_id
            WHERE trainer.id = ${id} AND trainer_pokemon.inParty = true
        
        `)
        return response.rows;
    }catch(error)
    {
        console.log("DB error in getPartyFromTrainer" , error.message)
    }
    
}




async function addOrUpdatePokemonToParty(trainerId,pokemonId){
    const result = await pool.query(`
        INSERT INTO trainer_pokemon (trainer_id,pokemon_id,nickname,level,inParty)
        VALUES ($1,$2,null,null,true)
        ON CONFLICT (trainer_id,pokemon_id)
        DO UPDATE SET inParty = EXCLUDED.inParty
        RETURNING
            CASE
                WHEN xmax = 0 THEN 'inserted'
                ELSE 'updated'
            END as action
    `,[trainerId,pokemonId])
    return result.rows[0].action;
}

async function removePokemonFromParty(trainerId,pokemonId){
    try{
        await pool.query(`
        UPDATE trainer_pokemon
        SET inParty = false
        WHERE trainer_id = ${trainerId} AND pokemon_id =${pokemonId}
    `)
    }catch(error){
        console.log("DB error in removePokemonFromParty",error)
    }
    
}


module.exports={getPartyFromTrainer,addOrUpdatePokemonToParty,removePokemonFromParty}