const axios = require("axios");

function getRegion(){
    // ['kanto','original-sinnoh','hoenn','original-johto','original-unova'];
    return ['hoenn','kanto','original-johto']
}
async function fetchPokedex(){
    const regions = getRegion();
    const regionToPokemonMap = new Map();

    await Promise.all(
        regions.map(async(region)=>{
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokedex/${region}`);
                regionToPokemonMap.set(region, res.data.pokemon_entries.map(p => p.pokemon_species.name));
            } catch (error) {
                console.error(`Error fetching region "${region}":`, error.response?.status || error.message);
            }
        })
        
    )
    
    return regionToPokemonMap
   
}

async function fetchPokemon(){
    const regionToPokemonMap = await fetchPokedex();
    
    const getPokemonData= async (name) => {
        try{
           
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            return response;
        }
        catch{
            
            return null;
        }
    }
    
    
    const pokemonToMovesMap = new Map();
    const pokemonToTypesMap = new Map();
    const detailsList = await Promise.all(
        Array.from(regionToPokemonMap.values()).flat().map(async(pokemon) =>{
            
            const pokemonData = await getPokemonData(pokemon)
            if(!pokemonData) return null;
            const moves = []
            pokemonData.data.moves.forEach((obj)=>{
                    moves.push(obj.move.name)
            })
            //////
                const types = []
                pokemonData.data.types.forEach((obj)=>{
                    
                    types.push(obj.type.name)
                })
                pokemonToTypesMap.set(pokemon,types);
                
            ///////
            pokemonToMovesMap.set(pokemon,moves)
            //pokemonToTypesMap.set(pokemon,)
            return({
               api_id: pokemonData.data.id,
                name: pokemonData.data.name,
                //type: pokemonData.data.types[0].type.name,
                sprite: pokemonData.data.sprites.front_default


            })

        })


    )
    console.log(regionToPokemonMap.get('hoenn').includes('deoxys'))
  const pokemonDetailsList = detailsList.filter(item => item !== null);
    
    
   return {pokemonDetailsList, pokemonToMovesMap,regionToPokemonMap,pokemonToTypesMap}
}

async function fetchMoves (pokemonToMovesMap){
    const pokemonList = Array.from(pokemonToMovesMap.keys())
    
    const list = await Promise.all(
        pokemonList.map(async(pokemon)=>{ 
            //console.log(pokemon)
            const p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
           
            return p.data.moves.map((data)=>{ 
               
                return (data.move.name)
            })
            
        })

    )
   

    const set = new Set();
    for (moves of list.flat() ){
        set.add(moves);
    }
    const movesSet = Array.from(set)
 
    
    const getMovesData = async(name) =>{
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${name}`)
      
        return response.data;

    } // make const list be an object with url and use that url instead of getMovesData
     const movesDetailsList = await Promise.all(
        movesSet.map(async(move) => {
            //console.log(move)
            const moveData = await getMovesData(move);
            return({
                    name: moveData.name, 
                    type: moveData.type.name,
                    power: moveData.power,
                    damage_class: moveData.damage_class.name,
                })
        }

      ));
      //console.log(data)
      return movesDetailsList;
}
async function fetchTypes(){
     const response = await axios.get("https://pokeapi.co/api/v2/type");
     const typesList = response.data.results.map(types=>types.name)
     return typesList
}


async function main(){ 
    // const {regionToPokemonMap} = await fetchPokemon();
    // console.log("Does Deoxys exist? :" + regionToPokemonMap.get('hoenn').includes("deoxys"))
    // const test = await axios.get(`https://pokeapi.co/api/v2/pokemon/386/`)
    // console.log(test)
 }

main();
module.exports = {fetchPokemon, fetchMoves,fetchPokedex,getRegion,fetchTypes};
