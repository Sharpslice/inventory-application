const {Client} = require("pg");
const fetchPokemon = require("./seed");
require('dotenv').config();

async function insertPokemon(client,pokemonList){

    const placeholder=[]
    const values =[]
    pokemonList.forEach((pokemon,index) => {
        const baseIndex = index * 4;

        placeholder.push(`($${baseIndex+1},$${baseIndex+2},$${baseIndex+3},$${baseIndex+4})`)
        values.push(pokemon.api_id,pokemon.name,pokemon.type,pokemon.sprite)


    });


    await client.query(`
        INSERT INTO pokemon (api_id,name,type,sprite) 
        VALUES ${placeholder.join(', ')}
        ON CONFLICT (api_id) DO NOTHING
    `, values)
    


}




async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();
    const pokemonList = await fetchPokemon('original-sinnoh');
    await insertPokemon(client, pokemonList)


    

    await client.end()
    console.log("done")
}
main();