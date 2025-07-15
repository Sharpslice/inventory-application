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
    const client = await pool.connect();
    try{
        await client.query('BEGIN');

        await client.query(`
            INSERT INTO learned_moves (trainer_id,pokemon_id,moves_id,slots)
            VALUES ($1,$2,$3,
                (   SELECT gs.slot FROM generate_series(0,3) AS gs(slot)
                    LEFT JOIN learned_moves 
                    ON gs.slot = learned_moves.slots
                    AND learned_moves.trainer_id =$4
                    AND learned_moves.pokemon_id =$5
                    WHERE learned_moves.slots IS NULL
                    order by gs.slot
                    LIMIT 1
                )    
            )
        `,[trainerId,pokemonId,movesId,trainerId,pokemonId]);

        await client.query('COMMIT')
        
    }   
    catch(error){
        await client.query('ROLLBACK')
        if(error.code === '23505')
        {
            return {success: false,error: 'duplicate move'}
        }
        if(error.code=== '23514'){
            return {success: false,error: 'slot is filled'}
        }
        return {success: false,error:error.message}
    }finally{
        client.release();
        
    }
}



module.exports={getAllMovesFromPokemon,getPokemonsMoveset,addMoveToPokemon}