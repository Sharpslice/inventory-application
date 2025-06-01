const axios = require("axios");

async function fetchPokedex(region){
    const pokedex = await axios.get( `https://pokeapi.co/api/v2/pokedex/${region}`)
    const pokemonList = pokedex.data.pokemon_entries
    

    const pokemonSet = new Set();
     for (const pokemon of pokemonList){
        pokemonSet.add(pokemon.pokemon_species.name)
     }
   
    return Array.from(pokemonSet)
   
}

async function fetchPokemon(region){
    const pokemonList = await fetchPokedex(region);
    
    const getPokemonData= async (name) => {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            return response.data;
        }
        catch{
            
            return null;
        }
    }
   
    const data = await Promise.all(
        pokemonList.map(async(pokemon)=>{
            const pokemonData = await getPokemonData(pokemon)
            if(!pokemonData) return null;
            return ({
                api_id: pokemonData.id,
                name: pokemonData.name,
                type: pokemonData.types[0].type.name,
                sprite: pokemonData.sprites.front_default
            })
        })
        


    );
    
   
   
    return data.filter(Boolean)
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
     pokemonList = await fetchPokemon('original-sinnoh');
     movesList = await fetchMoves(pokemonList)
     console.log(pokemonList)
    console.log(movesList)
    
 }

main();
module.exports = {fetchPokemon, fetchMoves};
