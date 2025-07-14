const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' })

async function getAllMovesFromPokemon(pokemonId){
    try{
        const result = await pool.query(`
            SELECT moves.id,moves.name,moves.type,moves.power,moves.damage_class
            FROM moves
            INNER JOIN pokemon_moveset ON pokemon_moveset.moves_id = moves.id
            INNER JOIN pokemon ON pokemon.id = pokemon_moveset.pokemon_id
            WHERE pokemon.id = $1
        `,[pokemonId])
        
        return result.rows;
    }catch(error){
        console.log('DB error in getMovesFromPokemon')
    }
}

async function getPokemonsMoveset(trainerId,pokemonId){
    try{
        const result = await pool.query(`   
            SELECT moves.id,moves.name,moves.type,moves.power,moves.damage_class
            FROM moves
            INNER JOIN learned_moves ON learned_moves.moves_id = moves.id
            WHERE learned_moves.trainer_id = $1 AND learned_moves.pokemon_id = $2
        `,[trainerId,pokemonId])
        return result.rows
    }catch(error){
        console.log('DB error in getPokemonsMoveset')
    }
}

async function addMoveToPokemon(trainerId,pokemonId,movesId){
    try{
        const isPokemonOwned = await pool.query(`
            SELECT * from trainer_pokemon
            WHERE trainer_id = $1 AND pokemon_id = $2
        `,[trainerId,pokemonId])
        
        if(isPokemonOwned.rowCount > 0){
            console.log('inserting move in database')
            const result = await pool.query(` 
            INSERT INTO learned_moves (trainer_id,pokemon_id,moves_id)
            VALUES ($1,$2,$3)
            ON CONFLICT (trainer_id,pokemon_id,moves_id) DO NOTHING
            RETURNING *
            `,[trainerId,pokemonId,movesId])
            
            return result
        }
        else{
            return false;
        }

        
    }catch(error){
        console.log('DB error in addMoveToPokemon')
    }
}



module.exports={getAllMovesFromPokemon,getPokemonsMoveset,addMoveToPokemon}