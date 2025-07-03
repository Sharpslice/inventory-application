const pool = require('./pool');

require('dotenv').config({ path: __dirname + '/../.env' });


async function getAllTrainers(){
    try{
        const response = await pool.query(`
        SELECT id,name FROM trainer
        `)
        return response.rows;
    }catch(error){
        console.log("DB error in getAllTrainer",error.message)
    }
    
}
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
async function getPartySize(id){
    try{
        const response = await pool.query(`
            SELECT COUNT(*) FROM trainer_pokemon
            WHERE trainer_id = ${id} AND inParty = true
        `)
        return response.rows;
    }catch(error){
        console.log("DB ERROR in getPartySize")
    }
}
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
        VALUES (${trainer_id},${pokemon_id},null,null,true)
        `)
        return result.rows;
    }catch(error)
    {
        console.log('DB error in insertPokemonIntoTrainer_pokemon',error.message)
    }
    
}
async function removePokemonFromParty(trainerId,pokemonId){
    try{
        await pool.query(`
        UPDATE trainer_pokemon
        SET inParty = false
        WHERE trainer_id = ${trainerId} AND pokemon_id =${pokemonId};
    `)
    }catch(error){
        console.log("DB error in removePokemonFromParty",error)
    }
    
}
async function DeletePokemonFromCollection(trainerId,pokemonId){
    try{
        await pool.query(`
        DELETE FROM trainer_pokemon WHERE trainer_id = ${trainerId} AND pokemon_id = ${pokemonId}
    `)
    }catch(error){
        console.log("DB error in DeletePokemonFromCollection",error.message)
    }
    
}

async function getPokemonFromRegion(id,offset , limit ){
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
async function getRegion(){
    try{
        const result = await pool.query(`SELECT id,region FROM region`)
       
        return result.rows;
    }catch(error){
        console.log("DB error in getRegion",error.message)
    }

}



async function main(){
    
    
}
main();

module.exports = {getPartySize,DeletePokemonFromCollection,getPokemonCollectionFromTrainer,getRegion,getPokemonFromRegion,getAllTrainers,getPokemonsType,getPartyFromTrainer,insertPokemonIntoTrainer_pokemon,removePokemonFromParty}