const pool = require('./pool');

require('dotenv').config({ path: __dirname + '/../.env' });


async function getAllTrainers(){
    try{
        const response = await pool.query(`
        SELECT id,name FROM trainer
        `)
        return response;
    }catch(error){
        console.log("unable to query trainer",error)
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
    const response = await pool.query(`
    
        SELECT types.type FROM types
        INNER JOIN types_pokemon ON types_pokemon.type_id = types.id 
        INNER JOIN pokemon ON pokemon.id = types_pokemon.pokemon_id 
        WHERE pokemon.id = ${id};

    `)
   
    return response;
}
async function getPartyFromTrainer(id){
    const response = await pool.query(`
            SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
            pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
            FROM pokemon
            INNER JOIN trainer_pokemon ON trainer_pokemon.pokemon_id = pokemon.id
            INNER JOIN trainer ON trainer.id = trainer_pokemon.trainer_id
            WHERE trainer.id = ${id} AND trainer_pokemon.inParty = true
        
        `)
        return response;
}
async function getPokemonCollectionFromTrainer(id){
    const response = await pool.query(`
            SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
            pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
            FROM pokemon
            INNER JOIN trainer_pokemon ON trainer_pokemon.pokemon_id = pokemon.id
            INNER JOIN trainer ON trainer.id = trainer_pokemon.trainer_id
            WHERE trainer.id = ${id} AND trainer_pokemon.inParty = false
        
        `)
        return response;
}

async function insertPokemonIntoTrainer_pokemon(trainer_id, pokemon_id){
    const result = await pool.query(`
        INSERT INTO trainer_pokemon (trainer_id,pokemon_id,nickname,level,inParty)
        VALUES (${trainer_id},${pokemon_id},null,null,true)
    `)
    return result;
}
async function removePokemonFromParty(trainerId,pokemonId){
    await pool.query(`
        UPDATE trainer_pokemon
        SET inParty = false
        WHERE trainer_id = ${trainerId} AND pokemon_id =${pokemonId};
    `)
}
async function DeletePokemonFromCollection(trainerId,pokemonId){
    await pool.query(`
        DELETE FROM trainer_pokemon WHERE trainer_id = ${trainerId} AND pokemon_id = ${pokemonId}
    `)
}

async function getPokemonFromRegion(id,offset , limit ){
    console.log(offset,limit)
    const result = await pool.query(`
        SELECT pokemon.id, pokemon.api_id, pokemon.name, pokemon.sprite,pokemon.hp,
        pokemon.attack,pokemon.defense,pokemon.special_attack,pokemon.special_defense,pokemon.speed
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

module.exports = {DeletePokemonFromCollection,getPokemonCollectionFromTrainer,getRegion,getPokemonFromRegion,getAllTrainers,getPokemonsType,getPartyFromTrainer,insertPokemonIntoTrainer_pokemon,removePokemonFromParty}