const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' })

async function getAllMovesFromPokemon(pokemonId){
    try{
        const result = await pool.query(`
            SELECT moves.id,moves.name,moves.type,moves.power,moves.damage_class
            FROM moves
            INNER JOIN pokemon_moveset ON pokemon_moveset.moves_id = moves.id
            INNER JOIN pokemon ON pokemon.id = pokemon_moveset.pokemon_id
            WHERE pokemon.id = ${pokemonId}
        `)
        console.log(result.rows)
        return result.rows;
    }catch(error){
        console.log('DB error in getMovesFromPokemon')
    }
}

module.exports={getAllMovesFromPokemon}