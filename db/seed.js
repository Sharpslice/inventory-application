const axios = require("axios");

async function fetchPokedex(region){
    const pokedex = await axios.get( `https://pokeapi.co/api/v2/pokedex/${region}`)

    const pokemonList = await Promise.all(
        pokedex.data.pokemon_entries.map(async(pokemon)=>{
            return (
                {name: pokemon.pokemon_species.name}
            )
        })

    );
    
    return pokemonList
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
            const pokemonData = await getPokemonData(pokemon.name)
            if(!pokemonData) return null;
            return ({
                api_id: pokemonData.id,
                name: pokemonData.name,
                type: pokemonData.types[0].type.name,
                sprite: pokemonData.sprites.front_default
            })
        })
    );

    //console.log(data)

    return data.filter(Boolean)
}

async function fetchMoves (pokemonList){
    //const moveList = await axios.get(`https://pokeapi.co/api/v2/move?limit=${limit}`);
    pokemonList.length = 3;
    //console.log(pokemonList)
    const list = await Promise.all(
        pokemonList.map(async(pokemon)=>{ //go through every pokemon
            const p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
            
            return p.data.moves.map((data)=>{ //creates an array of every move for every pokemon
                //console.log(data.move)
                return (data.move.name)
            })
            
        })

    )
    
    console.log(list.flat().length)

    const set = new Set();
    for (moves of list.flat() ){
        set.add(moves);
    }
    const movesSet = Array.from(set)
    //console.log(movesSet)
    
    const getMovesData = async(name) =>{
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${name}`)
        //console.log(response.data)
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
      console.log(data)
      return data;
}

async function main(){
    //moveList = fetchMoves();
    pokemonList = await fetchPokemon('original-sinnoh');
    fetchMoves(pokemonList)

    //console.log(pokemonList)
}



main();