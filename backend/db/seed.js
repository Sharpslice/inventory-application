const axios = require("axios");

async function fetchPokedex(){
    const regions = ['kanto','original-johto','hoenn']
    const pokemonMap = new Map();

    const pokemonList = await Promise.all(
        regions.map(async(region,index)=>{
       
            const pokedex = await axios.get( `https://pokeapi.co/api/v2/pokedex/${region}`)
            pokemonMap.set(region, pokedex.data.pokemon_entries.map((pokemon)=> pokemon.pokemon_species.name))
        })
        
    )
    

   
     
    return pokemonMap
   
}

async function fetchPokemon(regionPokemonMap){
    
    
    const getPokemonData= async (name) => {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            return response;
        }
        catch{
            
            return null;
        }
    }
    
    console.log(regionPokemonMap.values())
    const pokemonMap = new Map();
    const data = await Promise.all(
        Array.from(regionPokemonMap.values()).flat().map(async(pokemon) =>{
            
            const pokemonData = await getPokemonData(pokemon)
            if(!pokemonData) return null;
            const moves = []
            pokemonData.data.moves.forEach((obj)=>{
                    moves.push(obj.move.name)
            })
            pokemonMap.set(pokemon,moves)

            return({
               api_id: pokemonData.data.id,
                name: pokemonData.data.name,
                type: pokemonData.data.types[0].type.name,
                sprite: pokemonData.data.sprites.front_default


            })

        })


    )
   
    
   return {data, pokemonMap }
}

async function fetchMoves (pokemonList){
    
    const list = await Promise.all(
        pokemonList.map(async(pokemon)=>{ 
            const p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
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
     const data = await Promise.all(
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
      return data;
}



async function main(){
    //await getRegion();
     //pokemonList = await fetchPokemon('original-sinnoh');
     //console.log(pokemonList)
     //movesList = await fetchMoves(pokemonList)
     //console.log(pokemonList)
     //console.log(movesList)
    //await test('original-sinnoh')
    
    const test = await fetchPokedex()
    const x = await fetchPokemon(test)
    console.log(x.data)
 }

main();
module.exports = {fetchPokemon, fetchMoves,fetchPokedex};
