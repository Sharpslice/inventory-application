const {Client} = require("pg");
const {fetchPokemon,fetchMoves,fetchPokedex,getRegion, fetchTypes} = require("./seed");


require('dotenv').config({ path: __dirname + '/../.env' });


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
async function insertBatch(client,tableName,columns,placeholders,values,conflictCol = NULL){
    await client.query( `
        INSERT INTO ${tableName} (${columns.join(',')})
        VALUES ${placeholders.join(',')}
        ON CONFLICT (${conflictCol}) DO NOTHING`,values)

}

async function insertPokemon(client, list)
{
    const {placeholder, values} = buildInsertQuery(list);
    await insertBatch(client,'pokemon',
        ['api_id','name','sprite','hp','attack','defense','special_attack','special_defense','speed'],
        placeholder,values,['api_id'])
}
async function insertMoves(client, list)
{
    const {placeholder, values} = buildInsertQuery(list);
    await insertBatch(client,'moves',['name','type','power','damage_class'],placeholder,values,['name'])
    
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
    
    const placeholder_=[];

    const listOfRegions = Array.from(regionPokemonMap.keys())
    listOfRegions.forEach((_,index)=>{
        index =index+1
        placeholder_.push(`$${index}`)
    })
    
    const regionIds= await client.query(`
        SELECT id,region FROM region WHERE region IN (${placeholder_.join(',')})
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
            if (regionMap.get(region) == null || pokemonMap.get(pokemon) == null) {
            console.error(`Skipping entry: region='${region}', pokemon='${pokemon}', regionId=${regionMap.get(region)}, pokemonId=${pokemonMap.get(pokemon)}`);
            } else {
            
            regionIdPokemonId.push({pokemonId: pokemonMap.get(pokemon),regionId :regionMap.get(region) })
            }
        })
    })
    const {placeholder,values} = buildInsertQuery(regionIdPokemonId);
    await client.query(`
        INSERT INTO region_pokemon(pokemon_id,region_id)
        VALUES ${placeholder.join(',')}
        ON CONFLICT (pokemon_id,region_id) DO NOTHING
    `,values)

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
        
        moves.forEach(move=>{
            //console.log(move)
            pokeMoveSet.push({pokemon_id: pokemonIdMap.get(name), move_id: movesIdMap.get(move)})
        })
    })
   
   // const {placeholder,values} = buildInsertQuery(pokeMoveSet);
   const batchSize = 500;

for (let i = 0; i < pokeMoveSet.length; i += batchSize) {
  const batch = pokeMoveSet.slice(i, i + batchSize); // ✅ use pokeMoveSet

  const values = []; // ✅ local to this batch
  const placeholders = batch.map((row, j) => {
    values.push(row.pokemon_id, row.move_id);
    const idx = j * 2;
    return `($${idx + 1}, $${idx + 2})`;
  });

  const text = `
    INSERT INTO pokemon_moveset(pokemon_id, moves_id)
    VALUES ${placeholders.join(',')}
    ON CONFLICT (pokemon_id, moves_id) DO NOTHING
  `;

  await client.query({ text, values });
}



}
async function insertTypes(client,typeList){
    const placeholder = []
    typeList.forEach((_,index)=>{
        index = index+1
        placeholder.push(`($${index})`)
    })
    
    await client.query(`
        INSERT INTO types (type)
        VALUES ${placeholder.join(',')}
        ON CONFLICT (type) DO NOTHING
    `,typeList)
}
async function insertPokemonTypes(client,pokemonToTypesMap){
    

    const reversePokemonMap = new Map();
    const pokemonIds = await client.query(`
        SELECT id,name FROM pokemon;
    `)
    pokemonIds.rows.forEach((pokemon)=>{
        reversePokemonMap.set(pokemon.name,pokemon.id)
    })


    const reverseTypesMap = new Map();
    const typesIds = await client.query(`
        SELECT id, type FROM types;
    `)

    typesIds.rows.forEach((type)=>{
        reverseTypesMap.set(type.type,type.id)
    })

    const pokemonIdTypeId = [];

    Array.from(pokemonToTypesMap.keys()).forEach((pokemon)=>{
        Array.from(pokemonToTypesMap.get(pokemon)).forEach((type)=>{
            pokemonIdTypeId.push({pokemonId: reversePokemonMap.get(pokemon),typeId: reverseTypesMap.get(type)})
        })
    })
    const {placeholder,values} = buildInsertQuery(pokemonIdTypeId);
    await client.query(`
        INSERT INTO types_pokemon (pokemon_id,type_id)
        VALUES ${placeholder.join(',')}
        ON CONFLICT (pokemon_id,type_id) DO NOTHING
    `,values)
 

}


async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();

 
    
    const {pokemonDetailsList,pokemonToMovesMap,regionToPokemonMap,pokemonToTypesMap} = await fetchPokemon();

    const movesData = await fetchMoves(pokemonToMovesMap);

     await insertPokemon(client,pokemonDetailsList);

     await insertMoves(client,movesData);
     await insertRegion(client,getRegion())
    await insertTypes(client,await fetchTypes())


    await insertPokemon_moveset(client,pokemonToMovesMap)

    await insertRegion_pokemon(client, regionToPokemonMap)
    await insertPokemonTypes(client,pokemonToTypesMap)

    await client.end()
    console.log("done")
}
main();