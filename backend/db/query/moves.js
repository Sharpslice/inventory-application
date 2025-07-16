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
            SELECT moves.*, learned_moves.slots
            FROM moves
            INNER JOIN learned_moves ON learned_moves.moves_id = moves.id
            WHERE learned_moves.trainer_id = $1 AND learned_moves.pokemon_id = $2
            ORDER BY learned_moves.slots ASC
        `,[trainerId,pokemonId])
        return result.rows
    }catch(error){
        throw new Error()
    }
}

async function addMoveToPokemon(trainerId,pokemonId,movesId,slotId = null){
    
    try{
        if(slotId){
             console.log('inserting into', slotId)
            await pool.query(`
                INSERT INTO learned_moves(trainer_id,pokemon_id,moves_id,slots)
                VALUES ($1,$2,$3,$4)
                `,[trainerId,pokemonId,movesId,slotId])
           
        }
        else{
            console.log('inserting into next open slot')
            await pool.query(`
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
        
        }
        
       
        
    }   
    catch(error){
       
        if(error.code === '23505')
        {
            throw new Error('Duplicate Move')
            
        }
        if(error.code=== '23514'){
            throw new Error('Slot is filled')
           
        }
        if(error.code === '23502')
        {
            throw new Error('No Slots available')
        }
        throw new Error('Unknown db error')
    }
}



module.exports={getAllMovesFromPokemon,getPokemonsMoveset,addMoveToPokemon}