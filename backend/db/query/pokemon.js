const pool = require('../pool');

require('dotenv').config({ path: __dirname + '/../.env' })

async function getPokemonsType(id){
    try{
        const response = await pool.query(`
    
        SELECT types.type FROM types
        INNER JOIN types_pokemon ON types_pokemon.type_id = types.id 
        INNER JOIN pokemon ON pokemon.id = types_pokemon.pokemon_id 
        WHERE pokemon.id = ${id};

        `)
   
        return response.rows;
    }catch(error){
        console.log('DB error in getPokemonsType',error.message)
    }
    
}



module.exports={getPokemonsType}