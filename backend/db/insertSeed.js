const {Client} = require("pg");
const {fetchPokemon,fetchMoves,fetchPokedex,getRegion} = require("./seed");
const { loadPartialConfigAsync } = require("@babel/core");

require('dotenv').config();

function buildInsertQuery(dataList){
   
    const placeholder=[]
    const values =[]
    
    dataList.forEach((column,index) => {
        const baseIndex = index * Object.keys(dataList[0]).length;
        const tmp = []
        for(let i = 1;i<=Object.keys(dataList[0]).length;i++)
        {
            tmp.push(`$${baseIndex+i}`)
        }

        placeholder.push(`(${tmp.join(',')})`)
        values.push(Object.values(column));
        
    
    });
    return {placeholder,values : values.flat()}
}

async function insertPokemon(client, list)
{
    const {placeholder, values} = buildInsertQuery(list);
        await client.query(`
        INSERT INTO pokemon (api_id,name,type,sprite) 
        VALUES ${placeholder.join(', ')}
        ON CONFLICT (api_id) DO NOTHING
    `, values)
}
async function insertMoves(client, list)
{
    const {placeholder, values} = buildInsertQuery(list);
        await client.query(`
        INSERT INTO moves (name,type,power,damage_class) 
        VALUES ${placeholder.join(', ')}
        ON CONFLICT (name) DO NOTHING
    `, values)
    
}
async function insertRegion(client,regionList){

    const placeholder = []
    regionList.forEach((_,index)=>{
        placeholder.push(`($${index+1})`)
    })
    
    await client.query(`
        INSERT INTO region (region)
        VALUES ${placeholder.join(', ')}    
        ON CONFLICT (region) DO NOTHING
    `,regionList)
}

async function insertRegion_pokemon(client,regionPokemonMap){
    
    const placeholder=[];

    const listOfRegions = Array.from(regionPokemonMap.keys())
    listOfRegions.forEach((_,index)=>{
        index =index+1
        placeholder.push(`$${index}`)
    })
    
    const regionIds= await client.query(`
        SELECT id,region FROM region WHERE region IN (${placeholder.join(',')})
    `,listOfRegions)

    const regionMap = new Map();
    regionIds.rows.forEach((region)=>{
        regionMap.set(region.region,region.id)
    })

    const pokemonIds = await client.query(`
        SELECT id,name FROM pokemon 
    `)
    const pokemonMap = new Map();
    pokemonIds.rows.forEach((pokemon)=>{
        pokemonMap.set(pokemon.name,pokemon.id)
    })



    const regionIdPokemonId = []
    Array.from(regionPokemonMap.keys()).forEach((region)=>{
        Array.from(regionPokemonMap.get(region)).forEach((pokemon)=>{
            regionIdPokemonId.push({regionId :regionMap.get(region), pokemonId: pokemonMap.get(pokemon) })
        })
    })
    console.log(regionIdPokemonId);

}














async function insertPokemon_moveset(client,pokemonMap){

    const pokemonPlaceholder = []
    
    const listOfPokemons = Array.from(pokemonMap.keys());
   
    
    listOfPokemons.forEach((_,index)=>{
        index = index+1
        pokemonPlaceholder.push(`($${index})`)
    })
    
    const res = await client.query(`
        SELECT id,name FROM pokemon WHERE name IN (${pokemonPlaceholder.join(',')})
        
    `, listOfPokemons)
    const pokemonIdMap = new Map();

    res.rows.forEach((pokemon)=>{
        pokemonIdMap.set(pokemon.name,pokemon.id)
    })

    const listOfMoves = Array.from(pokemonMap.values()).flat();
    
    const listOfMovesSet = new Set();
    
    listOfMoves.forEach((move)=>{
        
        listOfMovesSet.add(move)
    });
    const movesPlaceholder =[];
  
    [...listOfMovesSet].forEach((_,index)=>{
        index = index+1;
        movesPlaceholder.push(`($${index})`)
    })


    const moveres = await client.query(`
        SELECT id,name FROM moves WHERE name IN (${movesPlaceholder.join(',')})
    `,[...listOfMovesSet])


    const movesIdMap = new Map()
    moveres.rows.forEach((move)=>{
        movesIdMap.set(move.name,move.id)
    })


    const pokeMoveSet = [];
    pokemonMap.forEach((moves,name)=>{
        //console.log(pokemonIdMap.get(name))
        moves.forEach(move=>{
            //console.log(move)
            pokeMoveSet.push({pokemon_id: pokemonIdMap.get(name), move_id: movesIdMap.get(move)})
        })
    })
    const {placeholder,values} = buildInsertQuery(pokeMoveSet);
    await client.query(`
        INSERT INTO pokemon_moveset(pokemon_id,moves_id)
        VALUES ${placeholder.join(',')}
    `,values)



}


async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();

 
    
    

    const {pokemonDetailsList,pokemonToMovesMap,regionToPokemonMap} = await fetchPokemon();

    const movesData = await fetchMoves(pokemonToMovesMap);
    
     await insertPokemon(client,pokemonDetailsList);
  
     await insertMoves(client,movesData);
     await insertRegion(client,getRegion())

    await insertPokemon_moveset(client,pokemonToMovesMap)

     await insertRegion_pokemon(client, regionToPokemonMap)
    await client.end()
    console.log("done")
}
main();