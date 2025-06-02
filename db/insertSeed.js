const {Client} = require("pg");
const {fetchPokemon,fetchMoves} = require("./seed");
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
async function insertPokemon_moveset(client,pokemonMap){

    const pokemonPlaceholder = []
    
    const listOfPokemons = Array.from(pokemonMap.keys());
   
    
    listOfPokemons.forEach((name,index)=>{
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
    
    listOfMoves.forEach((move,index)=>{
        
        listOfMovesSet.add(move)
    });

    //console.log([...listOfMovesSet])
    const movesPlaceholder =[];
    
    //  const list = [...listOfMovesSet]
    //  console.log(list)
    [...listOfMovesSet].forEach((move,index)=>{
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


    const pokeMoveSet = new Map();
    pokemonMap.forEach((moves,name)=>{
        //console.log(pokemonIdMap.get(name))
        moves.forEach(move=>{
            //console.log(move)
            pokeMoveSet.set(pokemonIdMap.get(name), movesIdMap.get(move))
        })
    })
    console.log(pokeMoveSet);



}


async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();

     const {data, pokemonMap} = await fetchPokemon('kanto')
    // //pokemonList = await fetchPokemon('original-sinnoh');
    // const movesList = await fetchMoves(data);
    // //console.log(pokemonList)
    // await insertPokemon(client,data)
    // await insertMoves(client,movesList);
    //console.log(pokemonMap)
    await insertPokemon_moveset(client,pokemonMap);


    await client.end()
    console.log("done")
}
main();