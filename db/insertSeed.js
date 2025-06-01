const {Client} = require("pg");
const fetchPokemon = require("./seed");
require('dotenv').config();

async function buildInsertQuery(dataList){
    dataList.length=1;
    const placeholder=[]
    const values =[]
    console.log(Object.keys(dataList[0]).length)
    dataList.forEach((column,index) => {
        const baseIndex = index * Object.keys(dataList[0]).length;
        const tmp = []
        for(const i = 1;i<=Object.keys(dataList[0]).length;i++)
        {
            tmp.push(`$${baseIndex+i}`)
        }

        placeholder.push(`(${tmp.join(',')})`)
        


        values.push(Object.values(column));
        
        

    });

    return {placeholder,values : values.flat()}

    // await client.query(`
    //     INSERT INTO pokemon (api_id,name,type,sprite) 
    //     VALUES ${placeholder.join(', ')}
    //     ON CONFLICT (api_id) DO NOTHING
    // `, values)
    
}




async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();
    const pokemonList = await fetchPokemon('original-sinnoh');
    await buildInsertQuery(pokemonList)
    

    await client.end()
    console.log("done")
}
main();