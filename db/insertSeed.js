const {Client} = require("pg");
const {fetchPokemon,fetchMoves} = require("./seed");

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
    // console.log(placeholder)
}



async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();
     pokemonList = await fetchPokemon('original-sinnoh');
     movesList = await fetchMoves(pokemonList);
    //console.log(pokemonList)
    await insertPokemon(client,pokemonList)
    await insertMoves(client,movesList);



    await client.end()
    console.log("done")
}
main();